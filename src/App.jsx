import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
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
  Info,
  UserRound,
  Users,
  Trash2,
} from "lucide-react";

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function shiftDays(isoDate, delta) {
  const d = new Date(`${isoDate}T00:00:00`);
  d.setDate(d.getDate() + delta);
  return d.toISOString().slice(0, 10);
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
    calories: 2335,
    protein: 207,
    carbs: 253,
    fat: 57,
    target: "2,300 kcal/day target",
    profile: "33, 170 cm, 100 kg, fat loss / recomposition",
  },
  her: {
    label: "Wife",
    short: "Her",
    calories: 1815,
    protein: 159,
    carbs: 191,
    fat: 48,
    target: "1,800 kcal/day target",
    profile: "32, 166 cm, 89 kg, sustainable 0.5 kg/week pace",
  },
};

const meals = [
  {
    name: "Breakfast",
    title: "Protein Cinnamon Oats",
    time: "7-10 min",
    note: "Use dry weight for oats.",
    him: {
      calories: 566,
      protein: 45,
      carbs: 80,
      fat: 8,
      portions: [
        "Oats, dry weight: 70g",
        "Whey isolate: 30g",
        "Low-fat milk or unsweetened oat milk: 200ml",
        "Banana: 100g",
        "Cinnamon/cardamom: to taste",
      ],
    },
    her: {
      calories: 409,
      protein: 35,
      carbs: 56,
      fat: 6,
      portions: [
        "Oats, dry weight: 45g",
        "Whey isolate: 25g",
        "Low-fat milk or unsweetened oat milk: 150ml",
        "Banana: 80g",
        "Cinnamon/cardamom: to taste",
      ],
    },
  },
  {
    name: "Lunch",
    title: "Spicy Chicken & Lentil Bowl",
    time: "Batch prep",
    note: "Track chicken raw; cooked serving shown as an estimate. Lentils are served by cooked weight.",
    him: {
      calories: 666,
      protein: 68,
      carbs: 64,
      fat: 16,
      portions: [
        "Chicken breast: 180g raw -> approx. 135g cooked",
        "Cooked lentils, cooked weight: 250g",
        "Vegetables/salad: 200g",
        "Olive oil or avocado oil: 12g",
      ],
    },
    her: {
      calories: 517,
      protein: 52,
      carbs: 54,
      fat: 11,
      portions: [
        "Chicken breast: 130g raw -> approx. 98g cooked",
        "Cooked lentils, cooked weight: 200g",
        "Vegetables/salad: 200g",
        "Olive oil or avocado oil: 8g",
      ],
    },
  },
  {
    name: "Snack",
    title: "Masala Eggs, Whey Iced Coffee & Fruit",
    time: "5-10 min",
    note: "Eggs can be boiled ahead for 3-4 days.",
    him: {
      calories: 354,
      protein: 32,
      carbs: 25,
      fat: 15,
      portions: [
        "Whole eggs: 2 large",
        "Whey isolate: 20g",
        "Apple: 150g",
        "Almonds: 10g",
      ],
    },
    her: {
      calories: 338,
      protein: 29,
      carbs: 19,
      fat: 17,
      portions: [
        "Whole eggs: 2 large",
        "Whey isolate: 15g",
        "Apple: 100g",
        "Almonds: 15g",
      ],
    },
  },
  {
    name: "Dinner",
    title: "Fresh Air-Fryer Chicken Rice Bowl",
    time: "25-30 min",
    note: "Track chicken raw; cooked serving shown as an estimate. Rice is served by cooked weight.",
    him: {
      calories: 750,
      protein: 62,
      carbs: 85,
      fat: 17,
      portions: [
        "Chicken breast: 220g raw -> approx. 165g cooked",
        "Basmati rice, cooked weight: 240g",
        "Vegetables: 250g",
        "Olive oil or avocado oil: 12g",
      ],
    },
    her: {
      calories: 551,
      protein: 44,
      carbs: 62,
      fat: 13,
      portions: [
        "Chicken breast: 150g raw -> approx. 113g cooked",
        "Basmati rice, cooked weight: 160g",
        "Vegetables: 250g",
        "Olive oil or avocado oil: 10g",
      ],
    },
  },
];

const recipes = [
  {
    name: "Protein Cinnamon Oats",
    timing: "7-10 minutes",
    tags: ["Breakfast", "Dry oats", "Whey"],
    ingredients: [
      "YOU: oats, dry weight: 70g; whey isolate: 30g; milk/oat milk: 200ml; banana: 100g.",
      "WIFE: oats, dry weight: 45g; whey isolate: 25g; milk/oat milk: 150ml; banana: 80g.",
      "Couple total: oats, dry weight: 115g; whey isolate: 55g; milk/oat milk: 350ml; banana: 180g.",
      "Spices/flavouring per couple: cinnamon 2g, cardamom 0.5g, salt 0.5g. Optional: cocoa powder 5g or instant coffee 2g.",
    ],
    method: [
      "Weigh oats dry before cooking: 70g for you, 45g for your wife.",
      "Add oats and milk to a bowl or pan.",
      "Cook until thickened, adding water if needed.",
      "Cool for 1-2 minutes, then stir in whey isolate so it does not turn grainy.",
      "Top with banana and cinnamon/cardamom.",
    ],
  },
  {
    name: "Spicy Chicken & Lentil Bowl",
    timing: "35-45 minutes for batch prep",
    tags: ["Lunch", "Raw chicken", "Dry lentils", "Cooked lentils"],
    ingredients: [
      "YOU per lunch: chicken breast 180g raw -> approx. 135g cooked; lentils 250g cooked; vegetables/salad 200g; oil 12g.",
      "WIFE per lunch: chicken breast 130g raw -> approx. 98g cooked; lentils 200g cooked; vegetables/salad 200g; oil 8g.",
      "Couple total per lunch day: chicken breast 310g raw -> approx. 233g cooked; lentils 450g cooked; vegetables/salad 400g; oil 20g.",
      "Dry lentil guide: around 180g dry lentils should cook to roughly 450g cooked lentils. For 3 days, use 540g dry lentils. For 7 days, use around 1.25kg dry lentils.",
      "Chicken marinade per couple per day: garlic paste 10g, ginger paste 10g, chilli powder 3g, turmeric 2g, cumin 3g, coriander powder 4g, garam masala 2g, black pepper 1g, salt 3g, lemon juice 20g.",
      "Lentil seasoning per couple per day: onion 80g, tomato 120g, garlic paste 8g, ginger paste 8g, turmeric 2g, cumin 3g, coriander powder 3g, chilli powder 2g, garam masala 1g, salt 3g, lemon juice 10g, fresh coriander 10g.",
    ],
    method: [
      "Weigh chicken raw before cooking: 180g for you, 130g for your wife. After cooking this will usually plate at around 135g and 98g.",
      "Marinate chicken with the measured spices, lemon, garlic and ginger.",
      "Cook chicken in a pan or air fryer until fully cooked.",
      "Weigh dry lentils before cooking. Use around 180g dry lentils per couple per day, or 540g dry lentils for a 3-day batch.",
      "Cook lentils with onion, tomato, garlic, ginger, measured spices and water until soft.",
      "After cooking, weigh the lentils cooked: 250g for you, 200g for your wife.",
      "Portion into containers with salad or vegetables and the measured oil.",
    ],
  },
  {
    name: "Masala Eggs & Whey Iced Coffee",
    timing: "5-10 minutes",
    tags: ["Snack", "Eggs", "Quick"],
    ingredients: [
      "YOU: whole eggs: 2 large; whey isolate: 20g; apple: 150g; almonds: 10g.",
      "WIFE: whole eggs: 2 large; whey isolate: 15g; apple: 100g; almonds: 15g.",
      "Couple total: 4 large eggs; whey isolate: 35g; apple: 250g; almonds: 25g.",
      "Seasoning per couple: chaat masala 2g or za'atar 2g, chilli flakes 1g, black pepper 1g. Optional salt 1g.",
      "Iced coffee: instant coffee 2-4g per person, water and ice. Add monk fruit sweetener if needed.",
    ],
    method: [
      "Boil eggs in advance for 8-10 minutes and refrigerate.",
      "Season eggs with measured chilli flakes, black pepper, chaat masala or za'atar.",
      "Shake whey isolate with cold water, ice and coffee.",
      "Eat fruit and almonds on the side. Weigh almonds carefully because they are calorie-dense.",
    ],
  },
  {
    name: "Fresh Air-Fryer Chicken Rice Bowl",
    timing: "25-30 minutes",
    tags: ["Dinner", "Fresh", "Air fryer", "Cooked rice"],
    ingredients: [
      "YOU per dinner: chicken breast 220g raw -> approx. 165g cooked; basmati rice 240g cooked; vegetables 250g; oil 12g.",
      "WIFE per dinner: chicken breast 150g raw -> approx. 113g cooked; basmati rice 160g cooked; vegetables 250g; oil 10g.",
      "Couple total per dinner: chicken breast 370g raw -> approx. 278g cooked; basmati rice 400g cooked; vegetables 500g; oil 22g.",
      "Dry rice guide: around 135g dry basmati rice usually gives roughly 400g cooked rice. Still weigh the final cooked rice portions before serving.",
      "Tikka seasoning per couple: garlic paste 10g, ginger paste 10g, chilli powder 3g, turmeric 2g, cumin 3g, coriander powder 4g, garam masala 2g, paprika 3g, black pepper 1g, salt 3g, lemon juice 20g.",
      "Shawarma seasoning per couple: garlic paste 10g, paprika 5g, cumin 3g, coriander powder 3g, cinnamon 0.5g, chilli powder 2g, black pepper 1g, salt 3g, lemon juice 20g.",
      "Peri-style seasoning per couple: garlic paste 10g, paprika 5g, chilli powder 3g, vinegar 15g, lemon juice 15g, black pepper 1g, salt 3g.",
    ],
    method: [
      "Weigh raw chicken before cooking: 220g for you, 150g for your wife. After cooking this will usually plate at around 165g and 113g.",
      "Marinate with one measured seasoning option for at least 20 minutes.",
      "Air fry at 180-200°C until fully cooked.",
      "Cook rice separately. Around 135g dry basmati rice should provide roughly 400g cooked rice for both of you.",
      "Weigh cooked rice before serving: 240g for you, 160g for your wife.",
      "Cook vegetables with measured oil and serve with lemon, coriander and chilli sauce.",
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
    items: ["Fresh chicken breast: ~5kg", "Eggs: 30", "Whey isolate: ~650g", "Optional salmon: 2 fillets"],
  },
  {
    category: "Carbs & legumes",
    items: [
      "Oats: 1kg",
      "Dry lentils: 1.2-1.5kg",
      "Basmati rice: 1kg",
      "Bananas: ~1.3kg",
      "Apples: ~1.8kg",
      "Optional potatoes: 2-3kg",
    ],
  },
  {
    category: "Fats",
    items: ["Olive oil or avocado oil: 500ml", "Almonds: 200g"],
  },
  {
    category: "Vegetables & salad",
    items: [
      "Cucumber",
      "Tomato",
      "Lettuce",
      "Capsicum",
      "Carrots",
      "Cabbage",
      "Courgette",
      "Spinach",
      "Frozen mixed vegetables",
      "Onions",
      "Garlic",
      "Ginger",
      "Lemons",
      "Fresh coriander",
    ],
  },
  {
    category: "Spices & extras",
    items: [
      "Chilli powder",
      "Turmeric",
      "Cumin",
      "Coriander powder",
      "Garam masala",
      "Paprika",
      "Black pepper",
      "Cinnamon",
      "Cardamom",
      "Chaat masala",
      "Za'atar",
      "Low-calorie chilli sauce",
      "Salt",
      "Vinegar",
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

export default function FatLossDashboard() {
  const [tab, setTab] = useState("overview");
  const CurrentIcon = tabs.find((t) => t.id === tab)?.icon || Users;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] text-slate-900 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 overflow-hidden rounded-[2rem] bg-slate-950 p-6 text-white shadow-xl md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm text-slate-200 ring-1 ring-white/15">
                <CurrentIcon className="h-4 w-4 shrink-0" />
                Shared meal prep + training system
              </div>
              <h1 className="text-3xl font-black tracking-tight md:text-5xl">Fat-Loss Plan Dashboard</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 md:text-base">
                A simple front end for your repeatable meal plan, recipes, Lulu shopping list, supplement stack, training split
                and adjustment protocol.
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
