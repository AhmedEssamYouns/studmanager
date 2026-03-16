'use client';

import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

function Svg(props: IconProps) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    />
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M20 20l-4.2-4.2" />
    </Svg>
  );
}

export function BellIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M9.5 20a2.5 2.5 0 0 0 5 0" />
      <path d="M6.5 16.5h11l-1.2-1.6a4 4 0 0 1-.8-2.4V10a4.5 4.5 0 1 0-9 0v2.5a4 4 0 0 1-.8 2.4z" />
    </Svg>
  );
}

export function PlusCircleIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v8M8 12h8" />
    </Svg>
  );
}

export function ArrowLeftCircleIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8l-4 4 4 4" />
      <path d="M8 12h8" />
    </Svg>
  );
}

export function ChevronIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M9 6l6 6-6 6" />
    </Svg>
  );
}

export function EditIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 20h4l10-10-4-4L4 16z" />
      <path d="M12 6l4 4" />
    </Svg>
  );
}

export function TrashIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5 7h14" />
      <path d="M10 4h4" />
      <path d="M8 7v11a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7" />
      <path d="M10 11v5M14 11v5" />
    </Svg>
  );
}

export function DashboardIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" />
    </Svg>
  );
}

export function TeamIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="10" cy="8.5" r="3" />
      <path d="M4.5 18a5.5 5.5 0 0 1 11 0" />
      <path d="M16.5 10.5A2.5 2.5 0 0 1 19 13" />
      <path d="M16 17a4.7 4.7 0 0 1 4-.5" />
    </Svg>
  );
}

export function SettingsIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="3.25" />
      <path d="M19 12a7 7 0 0 0-.12-1.27l2.02-1.56-2-3.46-2.39.79a7.2 7.2 0 0 0-2.2-1.28L14 2h-4l-.31 3.22a7.2 7.2 0 0 0-2.2 1.28l-2.39-.79-2 3.46 2.02 1.56A7 7 0 0 0 5 12c0 .43.04.85.12 1.27L3.1 14.83l2 3.46 2.39-.79c.67.55 1.41.98 2.2 1.28L10 22h4l.31-3.22a7.2 7.2 0 0 0 2.2-1.28l2.39.79 2-3.46-2.02-1.56c.08-.42.12-.84.12-1.27Z" />
    </Svg>
  );
}

export function MedicalIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="5" y="6" width="14" height="13" rx="2" />
      <path d="M9 6V4.5A1.5 1.5 0 0 1 10.5 3h3A1.5 1.5 0 0 1 15 4.5V6" />
      <path d="M12 10v5M9.5 12.5h5" />
    </Svg>
  );
}

export function NutritionIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M8 4v16" />
      <path d="M14 4c1 2.3 1.5 4.4 1.5 6.2S15 14 14 16" />
      <path d="M17 4c1 2.3 1.5 4.4 1.5 6.2S18 14 17 16" />
      <path d="M6 7h12" />
      <path d="M5 20h14" />
    </Svg>
  );
}

export function PerformanceIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3.5" y="5" width="17" height="12" rx="2" />
      <path d="M8 20h8" />
      <path d="M10.5 17v3M13.5 17v3" />
      <path d="M7 13l3-3 2.5 2.5 4-4" />
    </Svg>
  );
}

export function BreedingIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M7 12c2-4 8-4 10 0" />
      <path d="M7 12c-2 4 1 7 5 7" />
      <path d="M17 12c2 4-1 7-5 7" />
      <circle cx="12" cy="12" r="1.5" />
    </Svg>
  );
}

export function ExpensesIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 7h11a2 2 0 0 1 2 2v8H6a2 2 0 0 1-2-2V7Z" />
      <path d="M17 9h3v9a2 2 0 0 1-2 2h-9" />
      <circle cx="13" cy="12" r="1.5" />
    </Svg>
  );
}

export function RevenueIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5 19h14" />
      <path d="M7 16V9" />
      <path d="M12 16V5" />
      <path d="M17 16v-4" />
      <path d="M6 9l6-4 6 7" />
    </Svg>
  );
}

export function ContactsIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="11" cy="9" r="3" />
      <path d="M5.5 18a5.5 5.5 0 0 1 11 0" />
      <path d="M18 7.5h2.5M19.25 6.25v2.5" />
    </Svg>
  );
}

export function NewsIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="4" y="5" width="16" height="14" rx="2" />
      <path d="M8 9h8M8 12h8M8 15h5" />
      <path d="M6.5 9h.01" />
    </Svg>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M8 3v4M16 3v4M4 9h16" />
      <path d="M8 13h.01M12 13h.01M16 13h.01" />
    </Svg>
  );
}

export function ReportsIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14l4-2 4 2 4-2 4 2V9Z" />
      <path d="M14 3v6h6" />
      <path d="M9 11h4M9 14h6" />
    </Svg>
  );
}

export function DatabaseIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <ellipse cx="10" cy="6" rx="5" ry="2.5" />
      <path d="M5 6v6c0 1.38 2.24 2.5 5 2.5s5-1.12 5-2.5V6" />
      <path d="M15 9.5c2.3.24 4 1.2 4 2.35 0 1.33-2.24 2.4-5 2.4" />
      <path d="M15 14c2.3.24 4 1.2 4 2.35 0 1.33-2.24 2.4-5 2.4-2.2 0-4.07-.68-4.73-1.64" />
    </Svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </Svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M18 6L6 18M6 6l12 12" />
    </Svg>
  );
}
