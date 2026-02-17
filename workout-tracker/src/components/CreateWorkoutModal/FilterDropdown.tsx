import { useState, useRef, useEffect } from "react";

interface FilterDropdownItem {
  id: number;
  name: string;
}

interface FilterDropdownProps {
  items: FilterDropdownItem[];
  selected: number | "";
  placeholder: string;
  onSelect: (id: number | "") => void;
}

export default function FilterDropdown({
  items,
  selected,
  placeholder,
  onSelect
}: FilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedName = selected ? items.find(i => i.id === selected)?.name || "" : "";

  const filteredItems = items.filter(i => i.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="filter-dropdown-workout" ref={ref}>
      <input
        type="text"
        placeholder={placeholder}
        value={search || selectedName}
        onChange={e => setSearch(e.target.value)}
        onFocus={() => setOpen(true)}
      />
      {open && (
        <ul className="filter-list-workout">
          <li
            onClick={() => onSelect("")}
            className={selected === "" ? "active-workout" : ""}
          >
            All
          </li>
          {filteredItems.map(item => (
            <li
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={selected === item.id ? "active-workout" : ""}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}