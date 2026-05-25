import React, { useMemo, useState } from "react";
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
} from "lucide-react";

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
    note: "Use raw weight for chicken and cooked weight for lentils.",
    him: {
      calories: 666,
      protein: 68,
      carbs: 64,
      fat: 16,
      portions: [
        "Chicken breast, raw weight: 180g",
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
        "Chicken breast, raw weight: 130g",
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
      portions: ["Whole eggs: 2 large", "Whey isolate: 20g", "Apple: 150g", "Almonds: 10g"],
    },
    her: {
      calories: 338,
      protein: 29,
      carbs: 19,
      fat: 17,
      portions: ["Whole eggs: 2 large", "Whey isolate: 15g", "Apple: 100g", "Almonds: 15g"],
    },
  },
  {
    name: "Dinner",
    title: "Fresh Air-Fryer Chicken Rice Bowl",
    time: "25-30 min",
    note: "Cook dinner fresh. Use raw weight for chicken and cooked weight for rice.",
    him: {
      calories: 750,
      protein: 62,
      carbs: 85,
      fat: 17,
      portions: [
        "Chicken breast, raw weight: 220g",
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
        "Chicken breast, raw weight: 150g",
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
      "Use each person's oat, whey, milk and banana portions from the meal card.",
      "Cinnamon, cardamom and a tiny pinch of salt to taste.",
    ],
    method: [
      "Add oats and milk to a bowl or pan.",
      "Cook until thickened, adding water if needed.",
      "Cool for 1-2 minutes, then stir in whey isolate.",
      "Top with banana and cinnamon/cardamom.",
    ],
  },
  {
    name: "Spicy Chicken & Lentil Bowl",
    timing: "35-45 minutes for batch prep",
    tags: ["Lunch", "Raw chicken", "Cooked lentils"],
    ingredients: [
      "Couple total per day: 310g raw chicken breast.",
      "Couple total per day: 450g cooked lentils.",
      "Couple total per day: 400g vegetables/salad.",
      "Couple total per day: 20g oil.",
      "Garlic, ginger, chilli, turmeric, cumin, coriander powder, garam masala, lemon, salt and black pepper.",
    ],
    method: [
      "Weigh chicken raw before cooking: 180g for you, 130g for your wife.",
      "Marinate with spices, lemon, garlic and ginger.",
      "Cook chicken in a pan or air fryer until fully cooked.",
      "Cook lentils separately with onion, tomato, spices and water.",
      "Weigh lentils cooked: 250g for you, 200g for your wife.",
      "Portion into containers with salad or vegetables.",
    ],
  },
  {
    name: "Masala Eggs & Whey Iced Coffee",
    timing: "5-10 minutes",
    tags: ["Snack", "Eggs", "Quick"],
    ingredients: [
      "2 whole eggs each.",
      "Whey isolate: 20g for you, 15g for your wife.",
      "Apple: 150g for you, 100g for your wife.",
      "Almonds: 10g for you, 15g for your wife.",
    ],
    method: [
      "Boil eggs in advance for 8-10 minutes and refrigerate.",
      "Season eggs with chilli flakes, black pepper, chaat masala or za'atar.",
      "Shake whey isolate with cold water, ice and coffee.",
      "Eat fruit and almonds on the side.",
    ],
  },
  {
    name: "Fresh Air-Fryer Chicken Rice Bowl",
    timing: "25-30 minutes",
    tags: ["Dinner", "Fresh", "Air fryer"],
    ingredients: [
      "Couple total per dinner: 370g raw chicken breast.",
      "Couple total per dinner: 400g cooked basmati rice.",
      "Couple total per dinner: 500g vegetables.",
      "Couple total per dinner: 22g oil.",
      "Use shawarma, tikka or peri-style spices.",
    ],
    method: [
      "Weigh raw chicken before cooking: 220g for you, 150g for your wife.",
      "Marinate for at least 20 minutes, or use pre-marinated raw packs.",
      "Air fry at 180-200°C until fully cooked.",
      "Weigh cooked rice: 240g for you, 160g for your wife.",
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
  return (
    <div>
      <SectionTitle icon={ShoppingCart} eyebrow="Lulu Hypermarket" title="Weekly shopping list">
        For both of you for 7 days.
      </SectionTitle>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {shopping.map((group) => (
          <div key={group.category} className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <h3 className="text-lg font-bold text-slate-950">{group.category}</h3>
            <div className="mt-4 space-y-2">
              {group.items.map((item) => (
                <label
                  key={item}
                  className="flex cursor-pointer items-start gap-3 rounded-2xl bg-slate-50 p-3 text-sm text-slate-700 hover:bg-slate-100"
                >
                  <input type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300" />
                  <span>{item}</span>
                </label>
              ))}
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

function TrackingView() {
  return (
    <div>
      <SectionTitle icon={Scale} eyebrow="Adjustments" title="Tracking and calorie changes">
        Use 7-day averages, not single weigh-ins.
      </SectionTitle>
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h3 className="text-xl font-bold text-slate-950">Daily checklist</h3>
          <div className="mt-4 space-y-2">
            {["Morning body weight after bathroom", "Steps", "Training completed or not", "Calories and portions", "Sleep length"].map(
              (item) => (
                <label key={item} className="flex cursor-pointer items-start gap-3 rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
                  <input type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300" />
                  <span>{item}</span>
                </label>
              ),
            )}
          </div>
        </div>
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
          <p className="mt-2 text-sm text-slate-600">Raw weight for meat, cooked weight for rice/lentils, dry weight for oats.</p>
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
  const CurrentIcon = useMemo(() => tabs.find((t) => t.id === tab)?.icon || Users, [tab]);

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
