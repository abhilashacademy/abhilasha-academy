export interface Statistic {
  id: string;
  value: number;
  suffix: string;
  label: string;
  description: string;
}

export const statisticsData: Statistic[] = [
  {
    id: "students",
    value: 2500,
    suffix: "+",
    label: "Active Students",
    description: "Nurtured across classes Play Group to 12 in the academy campus.",
  },
  {
    id: "teachers",
    value: 45,
    suffix: "+",
    label: "Experienced Teachers",
    description: "Dedicated faculty focusing on customized support.",
  },
  {
    id: "results",
    value: 100,
    suffix: "%",
    label: "Board Results",
    description: "Consistent pass percentages in UP Board High School & Intermediate.",
  },
  {
    id: "awards",
    value: 25,
    suffix: "+",
    label: "Regional Awards",
    description: "Excellence in science fairs, sports tournaments, and debate contests.",
  },
];
