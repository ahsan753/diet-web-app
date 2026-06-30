import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  CalendarCheck2,
  Dumbbell,
  ShoppingCart,
  Utensils,
  Pill,
  Scale,
  ChefHat,
  Clock,
  Flame,
  Beef,
  Wheat,
  Droplets,
  ChevronRight,
  CheckCircle2,
  ClipboardCheck,
  Info,
  UserRound,
  Users,
  Trash2,
  CalendarX2,
} from "lucide-react";

function todayISO() {
  return toISODate(new Date());
}

function toISODate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function shiftDays(isoDate, delta) {
  const d = new Date(`${isoDate}T00:00:00`);
  d.setDate(d.getDate() + delta);
  return toISODate(d);
}

function dateFromISO(isoDate) {
  return new Date(`${isoDate}T00:00:00`);
}

function weekdayName(isoDate = todayISO()) {
  return dateFromISO(isoDate).toLocaleDateString(undefined, { weekday: "long" });
}

function readableDate(isoDate = todayISO()) {
  return dateFromISO(isoDate).toLocaleDateString(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
}

function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    if (typeof window === "undefined") return initial;
    try {
      const raw = window.localStorage.getItem(key);
      return raw !== null ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore quota / privacy-mode errors
    }
  }, [key, value]);

  return [value, setValue];
}

const tabs = [
  { id: "today", label: "Today", icon: CalendarCheck2 },
  { id: "overview", label: "Overview", icon: Users },
  { id: "meals", label: "Meals", icon: Utensils },
  { id: "recipes", label: "Recipes", icon: ChefHat },
  { id: "training", label: "Training", icon: Dumbbell },
  { id: "prep", label: "Prep Week", icon: CalendarDays },
  { id: "shopping", label: "Shopping", icon: ShoppingCart },
  { id: "supplements", label: "Supplements", icon: Pill },
  { id: "tracking", label: "Tracking", icon: Scale },
];

const people = {
  him: {
    label: "You",
    short: "Him",
    calories: 2322,
    protein: 200,
    carbs: 241,
    fat: 61,
    target: "~2,300 kcal/day target",
    profile: "33, 170 cm, 100 kg, fat loss / recomposition",
  },
  her: {
    label: "Wife",
    short: "Her",
    calories: 1817,
    protein: 161,
    carbs: 182,
    fat: 49,
    target: "~1,800 kcal/day target",
    profile: "32, 166 cm, 89 kg, sustainable 0.5 kg/week pace",
  },
};

const meals = [
  {
    name: "Breakfast",
    title: "Overnight Oats or Hot Porridge",
    time: "2-5 min",
    note: "Use dry weight for oats. Whey assumed as a 30g isolate scoop.",
    him: {
      calories: 547,
      protein: 46.5,
      carbs: 63.6,
      fat: 13.1,
      portions: [
        "Rolled oats, dry weight: 60g",
        "Skimmed milk: 200ml",
        "Natural peanut butter: 16g",
        "Frozen mixed berries: 80g",
        "Whey isolate: 30g",
      ],
    },
    her: {
      calories: 417,
      protein: 39.9,
      carbs: 46.6,
      fat: 8.7,
      portions: [
        "Rolled oats, dry weight: 40g",
        "Skimmed milk: 150ml",
        "Natural peanut butter: 10g",
        "Frozen mixed berries: 80g",
        "Whey isolate: 30g",
      ],
    },
  },
  {
    name: "Lunch",
    title: "Tikka Chicken + Lentils + Salad",
    time: "~35 min total",
    note: "Track chicken raw; cooked serving shown as an estimate. Lentils are served by cooked weight.",
    him: {
      calories: 619,
      protein: 70.9,
      carbs: 45.6,
      fat: 16.2,
      portions: [
        "Chicken breast: 240g raw -> approx. 180g cooked",
        "Cooked lentils: 130g",
        "Salad: full portion",
        "Olive oil in salad: 1 tsp / approx. 4.5g",
      ],
    },
    her: {
      calories: 499,
      protein: 57.2,
      carbs: 34.6,
      fat: 13.9,
      portions: [
        "Chicken breast: 200g raw -> approx. 150g cooked",
        "Cooked lentils: 85g",
        "Salad: full portion",
        "Olive oil in salad: 1 tsp / approx. 4.5g",
      ],
    },
  },
  {
    name: "Snack",
    title: "Boiled Eggs, Apple & Almonds",
    time: "30 sec assembly",
    note: "Both have 2 eggs. This keeps fat in range and leaves room for more dinner rice.",
    him: {
      calories: 297,
      protein: 15.2,
      carbs: 28.0,
      fat: 14.9,
      portions: [
        "Whole boiled eggs: 2",
        "Medium apple: 1",
        "Almonds: 10g",
      ],
    },
    her: {
      calories: 297,
      protein: 15.2,
      carbs: 28.0,
      fat: 14.9,
      portions: [
        "Whole boiled eggs: 2",
        "Medium apple: 1",
        "Almonds: 10g",
      ],
    },
  },
  {
    name: "Dinner",
    title: "Chicken Curry + Rice + Lentils + Veg",
    time: "~30 min total",
    note: "Rice adjusted upwards to keep calories and carbs on target. Track chicken raw; rice and lentils are served cooked.",
    him: {
      calories: 858,
      protein: 67.1,
      carbs: 104.1,
      fat: 16.8,
      portions: [
        "Chicken breast: 220g raw -> approx. 165g cooked",
        "Basmati rice: 240g cooked",
        "Cooked lentils: 60g",
        "Vegetables: half the pan",
      ],
    },
    her: {
      calories: 604,
      protein: 48.6,
      carbs: 73.0,
      fat: 11.2,
      portions: [
        "Chicken breast: 160g raw -> approx. 120g cooked",
        "Basmati rice: 160g cooked",
        "Cooked lentils: 40g",
        "Vegetables: half the pan",
      ],
    },
  },
];

const recipes = [
  {
    name: "Overnight Oats or Hot Porridge",
    timing: "2-5 minutes",
    tags: ["Breakfast", "Dry oats", "Whey"],
    ingredients: [
      "YOU: rolled oats 60g dry; skimmed milk 200ml; peanut butter 16g; frozen berries 80g; whey isolate 30g.",
      "WIFE: rolled oats 40g dry; skimmed milk 150ml; peanut butter 10g; frozen berries 80g; whey isolate 30g.",
      "Couple total: rolled oats 100g dry; skimmed milk 350ml; peanut butter 26g; frozen berries 160g; whey isolate 60g.",
    ],
    method: [
      "Cold version: combine oats, milk, peanut butter and berries in sealed tubs the night before.",
      "Refrigerate overnight for at least 6 hours.",
      "In the morning, stir in whey isolate with a splash of milk if too thick.",
      "Hot version: microwave oats and milk for 2 minutes, stir, then microwave 1 more minute.",
      "Stir in peanut butter while hot, add berries, wait 1 minute, then stir in whey so it does not clump.",
    ],
  },
  {
    name: "Tikka Chicken + Lentils + Salad",
    timing: "~35 minutes total, ~10 minutes active",
    tags: ["Lunch", "Raw chicken", "Dry lentils", "Cooked lentils"],
    ingredients: [
      "YOU: chicken breast 240g raw -> approx. 180g cooked; cooked lentils 130g; salad full portion; salad oil approx. 4.5g.",
      "WIFE: chicken breast 200g raw -> approx. 150g cooked; cooked lentils 85g; salad full portion; salad oil approx. 4.5g.",
      "Chicken marinade for both: plain low-fat yoghurt 30g, lemon juice 15g, garlic 1 clove, ginger 10g, garam masala 2g, paprika 2g, cumin 1g, coriander powder 1g, turmeric 0.5g, chilli powder 0.5g, salt 2g, olive oil 4.5g.",
      "Lentil pot for lunch + dinner: dry red lentils 125g, water 375ml, onion 50g, garlic 1 clove, ginger 10g, cumin 2g, turmeric 1g, chilli powder pinch, olive oil 4.5g, salt at the end.",
      "Salad per plate: cucumber 1/2, tomato 1 small, onion 1/4, lettuce/mixed leaves handful, olive oil 4.5g, lemon, salt and black pepper.",
    ],
    method: [
      "Weigh chicken raw before cooking: 240g for you and 200g for your wife.",
      "Mix the marinade, coat chicken and rest for 15-30 minutes.",
      "For lentils, heat oil, soften onion, then add garlic and ginger for 1 minute.",
      "Add cumin, turmeric and chilli for 30 seconds, then add 125g dry rinsed lentils and 375ml water.",
      "Simmer uncovered for about 25 minutes until porridge-like. Salt at the end.",
      "Air fry chicken at 200°C for around 12 minutes, flipping halfway. Rest for 3 minutes.",
      "Plate cooked lentils: 130g for you and 85g for your wife. Save 100g cooked lentils for dinner: 60g for you and 40g for your wife.",
    ],
  },
  {
    name: "Boiled Eggs, Apple & Almonds",
    timing: "30 seconds assembly, 12 minutes egg prep every 2 days",
    tags: ["Snack", "Eggs", "Quick"],
    ingredients: [
      "YOU: whole boiled eggs 2; medium apple 1; almonds 10g.",
      "WIFE: whole boiled eggs 2; medium apple 1; almonds 10g.",
      "Couple total per day: 4 eggs, 2 apples, almonds 20g.",
    ],
    method: [
      "Boil eggs for 10 minutes, then cool in ice water for 5 minutes.",
      "Store unpeeled eggs in the fridge in a sealed tub.",
      "Eat with apple and weighed almonds 1-2 hours before training if training that day.",
    ],
  },
  {
    name: "Chicken Curry + Rice + Lentils + Veg",
    timing: "~30 minutes",
    tags: ["Dinner", "Fresh", "Cooked rice", "Adjusted carbs"],
    ingredients: [
      "YOU: chicken breast 220g raw -> approx. 165g cooked; basmati rice 240g cooked; cooked lentils 60g; veg half the pan.",
      "WIFE: chicken breast 160g raw -> approx. 120g cooked; basmati rice 160g cooked; cooked lentils 40g; veg half the pan.",
      "Rice guide for both: cook around 135g dry basmati rice to give roughly 400g cooked rice. Still weigh cooked portions before serving.",
      "Curry base for both: onion 1 medium, garlic 3 cloves, ginger 20g, tomato 1 medium or tinned tomatoes 45g, tomato paste 15g, garam masala 2g, cumin 2g, coriander powder 2g, turmeric 1g, chilli powder 1g, olive oil 6.75g, water 150ml, salt to taste.",
      "Veg for both: spinach/courgette/pepper 200g, garlic 2 cloves, green chilli 1, olive oil 6.75g, salt and lemon.",
    ],
    method: [
      "Weigh raw chicken before cooking: 220g for you and 160g for your wife.",
      "Cook onion in oil until deep golden, then add garlic, ginger, tomato, tomato paste and spices.",
      "Add chicken chunks, coat in masala, then add water and simmer until cooked through.",
      "Cook around 135g dry basmati rice separately, then weigh cooked rice before serving.",
      "Plate cooked rice: 240g for you and 160g for your wife.",
      "Reheat the saved cooked lentils from lunch: 60g for you and 40g for your wife.",
      "Cook vegetables quickly with garlic, chilli and measured oil, then finish with lemon.",
    ],
  },
];

const training = [
  {
    day: "Saturday",
    session: "Push",
    note: "Evening session after shopping/prep.",
    exercises: [
      ["Barbell bench press", "4 x 5-8"],
      ["Incline dumbbell press", "3 x 8-12"],
      ["Standing barbell overhead press", "3 x 6-10"],
      ["Cable fly", "2 x 12-15"],
      ["Dumbbell lateral raise", "3 x 12-20"],
      ["Cable triceps pressdown", "3 x 10-15"],
      ["Optional incline walk", "10-15 min"],
    ],
  },
  {
    day: "Monday",
    session: "Pull",
    note: "Evening after work/tuition.",
    exercises: [
      ["Barbell row", "4 x 6-10"],
      ["Cable lat pulldown", "4 x 8-12"],
      ["One-arm dumbbell row", "3 x 10-12 each side"],
      ["Cable face pull", "3 x 12-20"],
      ["Rear delt raise", "2 x 15-20"],
      ["Barbell or dumbbell curl", "3 x 8-12"],
      ["Hammer curl", "2 x 10-15"],
    ],
  },
  {
    day: "Wednesday",
    session: "Lower",
    note: "Main lower-body strength day.",
    exercises: [
      ["Back squat", "4 x 5-8"],
      ["Romanian deadlift", "3 x 6-10"],
      ["Bulgarian split squat", "3 x 8-10 each leg"],
      ["Hip thrust or glute bridge", "3 x 8-12"],
      ["Standing calf raise", "4 x 10-15"],
      ["Plank", "3 x 45-60 sec"],
    ],
  },
  {
    day: "Friday",
    session: "Full Body",
    note: "Earlier weekend session.",
    exercises: [
      ["Deadlift", "3 x 3-5"],
      ["Dumbbell incline press", "3 x 8-12"],
      ["Cable row", "3 x 8-12"],
      ["Front squat or goblet squat", "3 x 8-10"],
      ["Dumbbell shoulder press", "2 x 8-12"],
      ["Cable woodchop", "3 x 10-12 each side"],
      ["Rowing machine", "8-12 min easy/moderate"],
    ],
  },
];

const prep = [
  {
    day: "Saturday",
    title: "Shop + batch prep",
    items: [
      "Shop at Lulu.",
      "Portion lunch chicken into 310g raw chicken packs per couple per day.",
      "Portion dinner chicken into 370g raw chicken packs per couple per dinner.",
      "Cook 2-3 days of lunch chicken and lentils.",
      "Freeze later lunch portions immediately.",
      "Boil eggs for 3-4 days.",
      "Wash and chop salad vegetables.",
    ],
  },
  {
    day: "Sunday",
    title: "Rest + fresh dinner",
    items: [
      "Use pre-weighed raw dinner chicken pack.",
      "Cook chicken fresh in the air fryer.",
      "Cook rice fresh or use same-day rice.",
    ],
  },
  {
    day: "Tuesday",
    title: "Rest + fresh dinner",
    items: [
      "Move next chicken pack from freezer to fridge the night before.",
      "Cook dinner fresh.",
      "Check lunch containers for the next two work days.",
    ],
  },
  {
    day: "Thursday",
    title: "Rest + fresh dinner",
    items: [
      "Cook fresh dinner.",
      "Review food stock before weekend shop.",
      "Note what was easy, boring or hard to stick to.",
    ],
  },
];

const shopping = [
  {
    category: "Protein",
    items: [
      "Fresh chicken breast: ~6kg",
      "Eggs: 30",
      "Whey isolate: ~450-500g",
      "Optional salmon: 2 fillets if replacing a chicken dinner",
    ],
  },
  {
    category: "Carbs & legumes",
    items: [
      "Rolled oats: 1kg",
      "Dry red lentils: 1kg",
      "Basmati rice: 1kg",
      "Frozen mixed berries: ~1.2kg",
      "Apples: 14",
      "Optional potatoes: 2-3kg if using rice swaps",
    ],
  },
  {
    category: "Fats",
    items: ["Natural peanut butter: 250g", "Olive oil or avocado oil: 500ml", "Almonds: 200g"],
  },
  {
    category: "Dairy / chilled",
    items: ["Skimmed milk: 3 litres", "Plain low-fat yoghurt: 500g"],
  },
  {
    category: "Vegetables & salad",
    items: [
      "Cucumber",
      "Tomato",
      "Lettuce or mixed leaves",
      "Onions",
      "Spinach",
      "Courgette",
      "Bell peppers",
      "Garlic",
      "Ginger",
      "Green chillies",
      "Lemons",
      "Fresh coriander",
    ],
  },
  {
    category: "Spices & extras",
    items: [
      "Garam masala",
      "Paprika",
      "Ground cumin",
      "Ground coriander",
      "Turmeric",
      "Chilli powder",
      "Black pepper",
      "Salt",
      "Tomato paste",
    ],
  },
];

const supplements = [
  {
    name: "Whey isolate",
    dose: "As in meal plan",
    who: "Both",
    purpose: "Makes protein easier without relying on cottage cheese or Greek yoghurt.",
  },
  {
    name: "Creatine monohydrate",
    dose: "3-5g daily",
    who: "You; wife optional",
    purpose: "Supports strength, training performance and lean mass retention.",
  },
  {
    name: "Caffeine",
    dose: "100-200mg pre-workout",
    who: "Optional",
    purpose: "Useful before training, but avoid late evening if sleep suffers.",
  },
  {
    name: "Omega-3",
    dose: "Prefer salmon/fish 1-2x weekly",
    who: "Optional",
    purpose: "Food first. Supplement only if fish intake is low.",
  },
  {
    name: "Vitamin D",
    dose: "Based on bloodwork/doctor advice",
    who: "Optional",
    purpose: "Commonly low, but best confirmed with testing.",
  },
];

function MacroPill({ icon: Icon, label, value }) {
  return (
    <div className="flex min-w-0 items-center gap-2 rounded-2xl bg-white/80 px-3 py-2 shadow-sm ring-1 ring-slate-200">
      <Icon className="h-4 w-4 shrink-0 text-slate-600" />
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-wide text-slate-500">{label}</p>
        <p className="truncate text-sm font-semibold text-slate-900">{value}</p>
      </div>
    </div>
  );
}

function SectionTitle({ icon: Icon, eyebrow, title, children }) {
  return (
    <div className="mb-5 flex flex-col gap-2">
      <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
        <Icon className="h-4 w-4 shrink-0" />
        {eyebrow}
      </div>
      <div className="flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-slate-950">{title}</h2>
        {children && <div className="text-sm text-slate-600">{children}</div>}
      </div>
    </div>
  );
}

function PersonCard({ person }) {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{person.short}</p>
          <h3 className="text-xl font-bold text-slate-950">{person.label}</h3>
          <p className="mt-1 text-sm text-slate-600">{person.profile}</p>
        </div>
        <div className="rounded-2xl bg-slate-100 p-3">
          <UserRound className="h-5 w-5 text-slate-700" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <MacroPill icon={Flame} label="Calories" value={`${person.calories} kcal`} />
        <MacroPill icon={Beef} label="Protein" value={`${person.protein}g`} />
        <MacroPill icon={Wheat} label="Carbs" value={`${person.carbs}g`} />
        <MacroPill icon={Droplets} label="Fat" value={`${person.fat}g`} />
      </div>
      <p className="mt-4 rounded-2xl bg-amber-50 p-3 text-sm text-amber-900 ring-1 ring-amber-100">
        {person.target}
      </p>
    </div>
  );
}

function MealCard({ meal }) {
  const [selected, setSelected] = useState("him");
  const data = meal[selected];

  return (
    <motion.div layout className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{meal.name}</p>
          <h3 className="mt-1 text-lg font-bold text-slate-950">{meal.title}</h3>
          <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
            <Clock className="h-4 w-4" /> {meal.time}
          </div>
        </div>
        <div className="flex rounded-2xl bg-slate-100 p-1 text-sm font-semibold">
          <button
            type="button"
            onClick={() => setSelected("him")}
            className={`rounded-xl px-3 py-1.5 ${selected === "him" ? "bg-white shadow-sm" : "text-slate-500"}`}
          >
            Him
          </button>
          <button
            type="button"
            onClick={() => setSelected("her")}
            className={`rounded-xl px-3 py-1.5 ${selected === "her" ? "bg-white shadow-sm" : "text-slate-500"}`}
          >
            Her
          </button>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-2">
        <MacroPill icon={Flame} label="Calories" value={`${data.calories} kcal`} />
        <MacroPill icon={Beef} label="Protein" value={`${data.protein}g`} />
        <MacroPill icon={Wheat} label="Carbs" value={`${data.carbs}g`} />
        <MacroPill icon={Droplets} label="Fat" value={`${data.fat}g`} />
      </div>

      <div className="space-y-2">
        {data.portions.map((item) => (
          <div key={item} className="flex gap-2 rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
            <span>{item}</span>
          </div>
        ))}
      </div>
      <p className="mt-4 flex gap-2 rounded-2xl bg-blue-50 p-3 text-sm text-blue-900 ring-1 ring-blue-100">
        <Info className="mt-0.5 h-4 w-4 shrink-0" />
        {meal.note}
      </p>
    </motion.div>
  );
}

function RecipesView() {
  const [active, setActive] = useState(recipes[0].name);
  const recipe = recipes.find((r) => r.name === active) || recipes[0];

  return (
    <div>
      <SectionTitle icon={ChefHat} eyebrow="Kitchen" title="Recipes & method">
        Same dishes, different portions.
      </SectionTitle>
      <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
        <div className="space-y-2">
          {recipes.map((recipeItem) => (
            <button
              key={recipeItem.name}
              type="button"
              onClick={() => setActive(recipeItem.name)}
              className={`flex w-full items-center justify-between rounded-2xl p-4 text-left shadow-sm ring-1 transition ${
                active === recipeItem.name
                  ? "bg-slate-950 text-white ring-slate-950"
                  : "bg-white text-slate-800 ring-slate-200 hover:bg-slate-50"
              }`}
            >
              <span className="font-semibold">{recipeItem.name}</span>
              <ChevronRight className="h-4 w-4 shrink-0" />
            </button>
          ))}
        </div>
        <motion.div
          key={recipe.name}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
        >
          <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-start">
            <div>
              <h3 className="text-2xl font-bold text-slate-950">{recipe.name}</h3>
              <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                <Clock className="h-4 w-4" /> {recipe.timing}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {recipe.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <h4 className="mb-3 font-bold text-slate-900">Ingredients / portions</h4>
              <div className="space-y-2">
                {recipe.ingredients.map((item) => (
                  <div key={item} className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="mb-3 font-bold text-slate-900">Method</h4>
              <ol className="space-y-2">
                {recipe.method.map((step, index) => (
                  <li key={step} className="flex gap-3 rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-slate-700 ring-1 ring-slate-200">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function TrainingView() {
  return (
    <div>
      <SectionTitle icon={Dumbbell} eyebrow="Gym" title="4-day training split">
        Push / Pull / Lower / Full Body
      </SectionTitle>
      <div className="grid gap-5 lg:grid-cols-2">
        {training.map((day) => (
          <div key={day.day} className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-500">{day.day}</p>
                <h3 className="text-xl font-bold text-slate-950">{day.session}</h3>
                <p className="mt-1 text-sm text-slate-600">{day.note}</p>
              </div>
              <div className="rounded-2xl bg-slate-100 p-3">
                <Dumbbell className="h-5 w-5 text-slate-700" />
              </div>
            </div>
            <div className="space-y-2">
              {day.exercises.map(([exercise, sets]) => (
                <div key={exercise} className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 p-3 text-sm">
                  <span className="font-medium text-slate-800">{exercise}</span>
                  <span className="shrink-0 rounded-full bg-white px-3 py-1 font-semibold text-slate-700 ring-1 ring-slate-200">
                    {sets}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-3xl bg-slate-950 p-5 text-white">
        <h3 className="font-bold">Progression rule</h3>
        <p className="mt-2 text-sm text-slate-200">
          Use the rep range. When you hit the top end of the range on all working sets with good form, increase the weight
          next time. Keep most sets at 1-3 reps in reserve.
        </p>
      </div>
    </div>
  );
}

function PrepView() {
  return (
    <div>
      <SectionTitle icon={CalendarDays} eyebrow="Weekly rhythm" title="Cooking and storage schedule">
        Lunches are batch-prepped. Dinners stay fresh.
      </SectionTitle>
      <div className="grid gap-5 md:grid-cols-2">
        {prep.map((block) => (
          <div key={block.day} className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm font-semibold text-slate-500">{block.day}</p>
            <h3 className="mt-1 text-xl font-bold text-slate-950">{block.title}</h3>
            <div className="mt-4 space-y-2">
              {block.items.map((item) => (
                <div key={item} className="flex gap-2 rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ShoppingView() {
  const [checked, setChecked] = useLocalStorage("shopping-checked-v1", {});

  const toggle = (key) => {
    setChecked((prev) => {
      const next = { ...prev };
      if (next[key]) delete next[key];
      else next[key] = true;
      return next;
    });
  };

  const clearAll = () => setChecked({});
  const checkedCount = Object.keys(checked).length;
  const totalCount = shopping.reduce((sum, g) => sum + g.items.length, 0);

  return (
    <div>
      <SectionTitle icon={ShoppingCart} eyebrow="Lulu Hypermarket" title="Weekly shopping list">
        For both of you for 7 days.
      </SectionTitle>
      <div className="mb-4 flex items-center justify-between gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-200">
        <p className="text-sm font-medium text-slate-700">
          {checkedCount} / {totalCount} ticked
        </p>
        <button
          type="button"
          onClick={clearAll}
          disabled={checkedCount === 0}
          className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 disabled:opacity-40"
        >
          Clear list
        </button>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {shopping.map((group) => (
          <div key={group.category} className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <h3 className="text-lg font-bold text-slate-950">{group.category}</h3>
            <div className="mt-4 space-y-2">
              {group.items.map((item) => {
                const key = `${group.category}:${item}`;
                const isChecked = !!checked[key];
                return (
                  <label
                    key={item}
                    className={`flex cursor-pointer items-start gap-3 rounded-2xl p-3 text-sm transition ${
                      isChecked ? "bg-green-50 text-slate-400 line-through" : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggle(key)}
                      className="mt-1 h-4 w-4 rounded border-slate-300"
                    />
                    <span>{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SupplementsView() {
  return (
    <div>
      <SectionTitle icon={Pill} eyebrow="Evidence-based only" title="Supplement stack">
        No fat burners. No detox teas. No fluff.
      </SectionTitle>
      <div className="space-y-4">
        {supplements.map((supplement) => (
          <div key={supplement.name} className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="grid gap-4 md:grid-cols-[1.2fr_1fr_1fr_2fr] md:items-center">
              <div>
                <p className="text-sm font-semibold text-slate-500">Supplement</p>
                <h3 className="text-lg font-bold text-slate-950">{supplement.name}</h3>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500">Dose</p>
                <p className="font-medium text-slate-800">{supplement.dose}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500">Who</p>
                <p className="font-medium text-slate-800">{supplement.who}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500">Purpose</p>
                <p className="text-slate-700">{supplement.purpose}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const dailyChecklistItems = [
  "Morning body weight after bathroom",
  "Steps",
  "Training completed or not",
  "Calories and portions",
  "Sleep length",
];

const orderedWeekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function nextTrainingFrom(dayName) {
  const startIndex = orderedWeekdays.indexOf(dayName);
  for (let offset = 1; offset <= orderedWeekdays.length; offset += 1) {
    const nextDay = orderedWeekdays[(startIndex + offset) % orderedWeekdays.length];
    const session = training.find((item) => item.day === nextDay);
    if (session) return { ...session, daysAway: offset };
  }
  return null;
}

function TodayWorkoutCard({ dayName }) {
  const workout = training.find((item) => item.day === dayName);
  const upcoming = workout ? null : nextTrainingFrom(dayName);

  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200 lg:col-span-2">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-500">{dayName}</p>
          <h3 className="text-xl font-bold text-slate-950">
            {workout ? `${workout.session} day` : "Rest / recovery day"}
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            {workout
              ? workout.note
              : upcoming
                ? `Next lift is ${upcoming.session} on ${upcoming.day}.`
                : "No workout is scheduled in the split."}
          </p>
        </div>
        <div className={`rounded-2xl p-3 ${workout ? "bg-slate-950" : "bg-slate-100"}`}>
          {workout ? (
            <Dumbbell className="h-5 w-5 text-white" />
          ) : (
            <CalendarX2 className="h-5 w-5 text-slate-700" />
          )}
        </div>
      </div>

      {workout ? (
        <div className="grid gap-2 sm:grid-cols-2">
          {workout.exercises.map(([exercise, sets]) => (
            <div key={exercise} className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 p-3 text-sm">
              <span className="font-medium text-slate-800">{exercise}</span>
              <span className="shrink-0 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                {sets}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Today focus</p>
            <p className="mt-1 font-semibold text-slate-900">Hit meals, steps, sleep, and prep basics.</p>
          </div>
          {upcoming && (
            <div className="rounded-2xl bg-blue-50 p-4 text-blue-950 ring-1 ring-blue-100">
              <p className="text-xs font-semibold uppercase tracking-wide">Next session</p>
              <p className="mt-1 font-semibold">
                {upcoming.session} in {upcoming.daysAway} {upcoming.daysAway === 1 ? "day" : "days"}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function TodayMealsCard() {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200 lg:col-span-2">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold text-slate-950">Today's meals</h3>
          <p className="mt-1 text-sm text-slate-500">Repeated daily, with portions split for both of you.</p>
        </div>
        <div className="rounded-2xl bg-slate-100 p-3">
          <Utensils className="h-5 w-5 text-slate-700" />
        </div>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-slate-950 p-4 text-white">
          <p className="text-sm text-slate-300">You</p>
          <p className="text-2xl font-bold">{people.him.calories} kcal</p>
          <p className="text-xs text-slate-300">{people.him.protein}g protein</p>
        </div>
        <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
          <p className="text-sm text-slate-500">Wife</p>
          <p className="text-2xl font-bold text-slate-950">{people.her.calories} kcal</p>
          <p className="text-xs text-slate-500">{people.her.protein}g protein</p>
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {meals.map((meal) => (
          <div key={meal.name} className="rounded-2xl bg-slate-50 p-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{meal.name}</p>
                <p className="mt-1 font-semibold text-slate-900">{meal.title}</p>
              </div>
              <span className="shrink-0 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
                {meal.time}
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              You {meal.him.calories} kcal / Wife {meal.her.calories} kcal
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TodayPrepCard({ dayName }) {
  const todayPrep = prep.find((block) => block.day === dayName);

  if (!todayPrep) return null;

  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-500">Prep today</p>
          <h3 className="text-xl font-bold text-slate-950">{todayPrep.title}</h3>
        </div>
        <div className="rounded-2xl bg-slate-100 p-3">
          <ChefHat className="h-5 w-5 text-slate-700" />
        </div>
      </div>
      <div className="space-y-2">
        {todayPrep.items.map((item) => (
          <div key={item} className="flex gap-2 rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FastWeightEntryCard() {
  const [selected, setSelected] = useState("him");
  const [logHim, setLogHim] = useLocalStorage("weight-log-him-v1", []);
  const [logHer, setLogHer] = useLocalStorage("weight-log-her-v1", []);
  const log = selected === "him" ? logHim : logHer;
  const setLog = selected === "him" ? setLogHim : setLogHer;
  const today = todayISO();
  const todaysEntry = log.find((entry) => entry.date === today);
  const latestEntry = [...log].sort((a, b) => b.date.localeCompare(a.date))[0];

  const [weight, setWeight] = useState("");
  const [status, setStatus] = useState("");

  const saveWeight = (event) => {
    event.preventDefault();
    const parsed = Number.parseFloat(weight);
    if (!Number.isFinite(parsed) || parsed <= 0 || parsed > 500) {
      setStatus("Enter a valid kg weight.");
      return;
    }

    setLog((prev) => {
      const withoutToday = prev.filter((entry) => entry.date !== today);
      return [...withoutToday, { date: today, weight: parsed }].sort((a, b) => a.date.localeCompare(b.date));
    });
    setWeight("");
    setStatus(`Saved ${parsed.toFixed(1)} kg for today.`);
  };

  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold text-slate-950">Fast weigh-in</h3>
          <p className="mt-1 text-sm text-slate-500">One tap, today's date, existing trend log.</p>
        </div>
        <div className="rounded-2xl bg-slate-100 p-3">
          <Scale className="h-5 w-5 text-slate-700" />
        </div>
      </div>

      <div className="mb-3 flex rounded-2xl bg-slate-100 p-1 text-sm font-semibold">
        <button
          type="button"
          onClick={() => {
            setSelected("him");
            setStatus("");
          }}
          className={`min-h-10 flex-1 rounded-xl px-3 ${selected === "him" ? "bg-white shadow-sm" : "text-slate-500"}`}
        >
          You
        </button>
        <button
          type="button"
          onClick={() => {
            setSelected("her");
            setStatus("");
          }}
          className={`min-h-10 flex-1 rounded-xl px-3 ${selected === "her" ? "bg-white shadow-sm" : "text-slate-500"}`}
        >
          Wife
        </button>
      </div>

      <form onSubmit={saveWeight} className="grid gap-2 sm:grid-cols-[1fr_auto]">
        <input
          data-testid="today-weight-input"
          type="number"
          step="0.1"
          inputMode="decimal"
          placeholder={todaysEntry ? `${todaysEntry.weight.toFixed(1)} kg saved` : "Weight in kg"}
          value={weight}
          onChange={(event) => setWeight(event.target.value)}
          className="min-h-12 rounded-2xl bg-slate-50 px-4 text-base ring-1 ring-slate-200 focus:bg-white"
        />
        <button
          data-testid="today-weight-save"
          type="submit"
          className="min-h-12 rounded-2xl bg-slate-950 px-5 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Save today
        </button>
      </form>

      {status ? (
        <p
          className={`mt-3 rounded-2xl p-3 text-sm ring-1 ${
            status.startsWith("Saved") ? "bg-green-50 text-green-900 ring-green-100" : "bg-rose-50 text-rose-900 ring-rose-100"
          }`}
        >
          {status}
        </p>
      ) : (
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Today</p>
            <p className="mt-1 font-bold text-slate-950">{todaysEntry ? `${todaysEntry.weight.toFixed(1)} kg` : "Not logged"}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Latest</p>
            <p className="mt-1 font-bold text-slate-950">{latestEntry ? `${latestEntry.weight.toFixed(1)} kg` : "No entries"}</p>
            {latestEntry && <p className="text-xs text-slate-500">{latestEntry.date}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

function DailyChecklistCard() {
  const [data, setData] = useLocalStorage("daily-checklist-v1", { date: todayISO(), checked: {} });
  const today = todayISO();

  useEffect(() => {
    if (data.date !== today) {
      setData({ date: today, checked: {} });
    }
  }, [today, data.date, setData]);

  const checked = data.date === today ? data.checked : {};
  const toggle = (item) => {
    setData({
      date: today,
      checked: { ...checked, [item]: !checked[item] },
    });
  };

  const doneCount = Object.values(checked).filter(Boolean).length;

  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold text-slate-950">Daily checklist</h3>
          <p className="mt-1 text-sm text-slate-500">Resets automatically each day.</p>
        </div>
        <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
          {doneCount} / {dailyChecklistItems.length}
        </span>
      </div>
      <div className="mt-4 space-y-2">
        {dailyChecklistItems.map((item) => {
          const isChecked = !!checked[item];
          return (
            <label
              key={item}
              className={`flex cursor-pointer items-start gap-3 rounded-2xl p-3 text-sm transition ${
                isChecked ? "bg-green-50 text-slate-400 line-through" : "bg-slate-50 text-slate-700"
              }`}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => toggle(item)}
                className="mt-1 h-4 w-4 rounded border-slate-300"
              />
              <span>{item}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

function WeightLogCard() {
  const [selected, setSelected] = useState("him");
  const [logHim, setLogHim] = useLocalStorage("weight-log-him-v1", []);
  const [logHer, setLogHer] = useLocalStorage("weight-log-her-v1", []);
  const log = selected === "him" ? logHim : logHer;
  const setLog = selected === "him" ? setLogHim : setLogHer;

  const [date, setDate] = useState(todayISO());
  const [weight, setWeight] = useState("");
  const [error, setError] = useState("");

  const addEntry = (event) => {
    event.preventDefault();
    const w = Number.parseFloat(weight);
    if (!date) {
      setError("Pick a date.");
      return;
    }
    if (!Number.isFinite(w) || w <= 0 || w > 500) {
      setError("Enter a weight in kg.");
      return;
    }
    setError("");
    setLog((prev) => {
      const without = prev.filter((entry) => entry.date !== date);
      return [...without, { date, weight: w }].sort((a, b) => a.date.localeCompare(b.date));
    });
    setWeight("");
  };

  const deleteEntry = (entryDate) => {
    setLog((prev) => prev.filter((entry) => entry.date !== entryDate));
  };

  const today = todayISO();
  const sevenAgo = shiftDays(today, -7);
  const fourteenAgo = shiftDays(today, -14);
  const last7 = log.filter((e) => e.date > sevenAgo && e.date <= today);
  const prev7 = log.filter((e) => e.date > fourteenAgo && e.date <= sevenAgo);
  const mean = (arr) => (arr.length ? arr.reduce((s, e) => s + e.weight, 0) / arr.length : null);
  const last7Avg = mean(last7);
  const prev7Avg = mean(prev7);
  const change = last7Avg != null && prev7Avg != null ? last7Avg - prev7Avg : null;

  const sortedNewestFirst = [...log].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200 lg:col-span-2">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold text-slate-950">Weight log</h3>
          <p className="mt-1 text-sm text-slate-500">Morning body weight after the bathroom.</p>
        </div>
        <div className="flex rounded-2xl bg-slate-100 p-1 text-sm font-semibold">
          <button
            type="button"
            onClick={() => setSelected("him")}
            className={`rounded-xl px-3 py-1.5 ${selected === "him" ? "bg-white shadow-sm" : "text-slate-500"}`}
          >
            You
          </button>
          <button
            type="button"
            onClick={() => setSelected("her")}
            className={`rounded-xl px-3 py-1.5 ${selected === "her" ? "bg-white shadow-sm" : "text-slate-500"}`}
          >
            Wife
          </button>
        </div>
      </div>

      <form onSubmit={addEntry} className="mb-4 grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
        <input
          type="date"
          value={date}
          max={today}
          onChange={(event) => setDate(event.target.value)}
          className="rounded-2xl bg-slate-50 px-3 py-2.5 text-sm ring-1 ring-slate-200 focus:bg-white"
        />
        <input
          type="number"
          step="0.1"
          inputMode="decimal"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(event) => setWeight(event.target.value)}
          className="rounded-2xl bg-slate-50 px-3 py-2.5 text-sm ring-1 ring-slate-200 focus:bg-white"
        />
        <button
          type="submit"
          className="rounded-2xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Save
        </button>
      </form>
      {error && (
        <p className="mb-3 rounded-2xl bg-rose-50 p-3 text-sm text-rose-900 ring-1 ring-rose-100">{error}</p>
      )}

      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Last 7-day avg</p>
          <p className="mt-1 text-2xl font-bold text-slate-950">
            {last7Avg != null ? `${last7Avg.toFixed(1)} kg` : "—"}
          </p>
          <p className="mt-1 text-xs text-slate-500">{last7.length} entries</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Prior 7-day avg</p>
          <p className="mt-1 text-2xl font-bold text-slate-950">
            {prev7Avg != null ? `${prev7Avg.toFixed(1)} kg` : "—"}
          </p>
          <p className="mt-1 text-xs text-slate-500">{prev7.length} entries</p>
        </div>
        <div
          className={`rounded-2xl p-4 ring-1 ${
            change == null
              ? "bg-slate-50 ring-transparent"
              : change < -0.05
                ? "bg-green-50 ring-green-100"
                : change > 0.05
                  ? "bg-amber-50 ring-amber-100"
                  : "bg-slate-50 ring-transparent"
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Week-over-week</p>
          <p className="mt-1 text-2xl font-bold text-slate-950">
            {change == null ? "—" : `${change > 0 ? "+" : ""}${change.toFixed(2)} kg`}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {change == null ? "Need 2 weeks of data" : change < 0 ? "Trending down" : change > 0 ? "Trending up" : "Flat"}
          </p>
        </div>
      </div>

      {sortedNewestFirst.length === 0 ? (
        <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">
          No entries yet. Add your first weigh-in above.
        </p>
      ) : (
        <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
          {sortedNewestFirst.map((entry) => (
            <div key={entry.date} className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 p-3 text-sm">
              <div>
                <p className="font-semibold text-slate-900">{entry.weight.toFixed(1)} kg</p>
                <p className="text-xs text-slate-500">{entry.date}</p>
              </div>
              <button
                type="button"
                onClick={() => deleteEntry(entry.date)}
                aria-label={`Delete entry for ${entry.date}`}
                className="rounded-full bg-white p-2 text-slate-500 ring-1 ring-slate-200 hover:bg-slate-100 hover:text-rose-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function TrackingView() {
  return (
    <div>
      <SectionTitle icon={Scale} eyebrow="Adjustments" title="Tracking and calorie changes">
        Use 7-day averages, not single weigh-ins.
      </SectionTitle>
      <div className="grid gap-5 lg:grid-cols-2">
        <DailyChecklistCard />
        <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h3 className="text-xl font-bold text-slate-950">Expected weekly loss</h3>
          <div className="mt-4 grid gap-3">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-500">You</p>
              <p className="text-2xl font-bold text-slate-950">0.5-0.9 kg/week</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-500">Wife</p>
              <p className="text-2xl font-bold text-slate-950">0.4-0.6 kg/week</p>
            </div>
          </div>
        </div>
        <WeightLogCard />
        <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200 lg:col-span-2">
          <h3 className="text-xl font-bold text-slate-950">Adjustment protocol</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl bg-green-50 p-4 text-green-950 ring-1 ring-green-100">
              <p className="font-bold">Week 1-2</p>
              <p className="mt-1 text-sm">Do not adjust unless weight is increasing sharply and tracking is accurate.</p>
            </div>
            <div className="rounded-2xl bg-blue-50 p-4 text-blue-950 ring-1 ring-blue-100">
              <p className="font-bold">Week 3</p>
              <p className="mt-1 text-sm">If loss is too slow, reduce 100-200 kcal or increase steps to around 8,500/day.</p>
            </div>
            <div className="rounded-2xl bg-amber-50 p-4 text-amber-950 ring-1 ring-amber-100">
              <p className="font-bold">Week 6</p>
              <p className="mt-1 text-sm">If progress stalls for 2 weeks, increase steps first, then reduce calories if needed.</p>
            </div>
          </div>
          <p className="mt-4 rounded-2xl bg-slate-950 p-4 text-sm text-white">
            A real plateau means no change in 7-day average weight for 2-3 weeks while tracking accurately. It does not mean the
            scale failed to move for 3 days.
          </p>
        </div>
      </div>
    </div>
  );
}

function OverviewView() {
  return (
    <div>
      <SectionTitle icon={Users} eyebrow="Shared kitchen system" title="Fat-loss dashboard">
        Same dishes. Different portions.
      </SectionTitle>
      <div className="grid gap-5">
        <PersonCard person={people.him} />
        <PersonCard person={people.her} />
      </div>
      <div className="mt-5 grid gap-5 md:grid-cols-3">
        <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h3 className="font-bold text-slate-950">Weighing rules</h3>
          <p className="mt-2 text-sm text-slate-600">Track meat raw, but use the cooked-weight estimate for plating. Rice/lentils are served cooked. Oats are weighed dry.</p>
        </div>
        <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h3 className="font-bold text-slate-950">Adherence first</h3>
          <p className="mt-2 text-sm text-slate-600">Same daily calories, simple repeated meals, and fresh dinners on rest days.</p>
        </div>
        <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h3 className="font-bold text-slate-950">Adjust by trend</h3>
          <p className="mt-2 text-sm text-slate-600">Use 7-day average body weight before changing food.</p>
        </div>
      </div>
    </div>
  );
}

function MealsView() {
  return (
    <div>
      <SectionTitle icon={Utensils} eyebrow="Daily structure" title="Four meals per day">
        Click Him/Her inside each card to switch portions.
      </SectionTitle>
      <div className="grid gap-5 lg:grid-cols-2">
        {meals.map((meal) => (
          <MealCard key={meal.name} meal={meal} />
        ))}
      </div>
    </div>
  );
}

function TodayView() {
  const today = todayISO();
  const dayName = weekdayName(today);

  return (
    <div>
      <SectionTitle icon={CalendarCheck2} eyebrow={readableDate(today)} title="Today">
        Your workout, food, checklist, and weigh-in.
      </SectionTitle>
      <div className="grid gap-5 lg:grid-cols-2">
        <TodayWorkoutCard dayName={dayName} />
        <TodayMealsCard />
        <DailyChecklistCard />
        <FastWeightEntryCard />
        <TodayPrepCard dayName={dayName} />
      </div>
      <div className="mt-5 rounded-3xl bg-slate-950 p-5 text-white">
        <div className="flex items-start gap-3">
          <ClipboardCheck className="mt-0.5 h-5 w-5 shrink-0 text-slate-300" />
          <div>
            <h3 className="font-bold">Today’s non-negotiable</h3>
            <p className="mt-1 text-sm text-slate-300">
              Log morning weight, follow the four meals, complete the checklist, and do the scheduled lift when one appears.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FatLossDashboard() {
  const [tab, setTab] = useState("today");
  const currentTab = tabs.find((t) => t.id === tab) || tabs[0];
  const CurrentIcon = currentTab.icon;
  const isTodayTab = tab === "today";
  const heroTitle = isTodayTab ? "Today" : "Fat-Loss Plan Dashboard";
  const heroCopy = isTodayTab
    ? `${readableDate(todayISO())}: current workout, meals, checklist, and fast weigh-in.`
    : "Open to Today for the current workout, meals, checklist, and quick weigh-in. The rest of the dashboard keeps recipes, shopping, training, and trend review close by.";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] text-slate-900 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 overflow-hidden rounded-[2rem] bg-slate-950 p-5 text-white shadow-xl md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm text-slate-200 ring-1 ring-white/15">
                <CurrentIcon className="h-4 w-4 shrink-0" />
                Shared meal prep + training system
              </div>
              <h1 className="text-3xl font-black tracking-tight md:text-5xl">{heroTitle}</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 md:text-base">
                {heroCopy}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm md:w-[360px]">
              <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/15">
                <p className="text-slate-300">You</p>
                <p className="text-2xl font-bold">2,300 kcal</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/15">
                <p className="text-slate-300">Wife</p>
                <p className="text-2xl font-bold">1,800 kcal</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 flex gap-2 overflow-x-auto rounded-3xl bg-white p-2 shadow-sm ring-1 ring-slate-200">
          {tabs.map((item) => {
            const Icon = item.icon;
            const active = tab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={`flex shrink-0 items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                  active ? "bg-slate-950 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {item.label}
              </button>
            );
          })}
        </div>

        <motion.main
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22 }}
        >
          {tab === "today" && <TodayView />}
          {tab === "overview" && <OverviewView />}
          {tab === "meals" && <MealsView />}
          {tab === "recipes" && <RecipesView />}
          {tab === "training" && <TrainingView />}
          {tab === "prep" && <PrepView />}
          {tab === "shopping" && <ShoppingView />}
          {tab === "supplements" && <SupplementsView />}
          {tab === "tracking" && <TrackingView />}
        </motion.main>
      </div>
    </div>
  );
}
