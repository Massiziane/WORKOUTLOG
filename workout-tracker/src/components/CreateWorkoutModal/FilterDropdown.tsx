import { useState, useRef, useEffect } from "react";
import type { FilterDropdownProps } from "./types";


/**
 * FilterDropdown
 * - Searchable dropdown used to filter lists (e.g. by category or muscle group).
 * - Shows a text input and a dropdown list of items.
 * - Calls `onSelect` with either an item id or "" for "All".
 */
export default function FilterDropdown({
  items,
  selected,
  placeholder,
  onSelect,
}: FilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  /**
   * Close dropdown when clicking outside the component.
   */
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

  // Resolve selected item name (for input display)
  const selectedName = selected
    ? items.find(i => i.id === selected)?.name || ""
    : "";

  // Apply text filter to items
  const filteredItems = items.filter(i =>
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="filter-dropdown-workout" ref={ref}>
      {/* Input acts as both search box and display for selected item */}
      <input
        type="text"
        placeholder={placeholder}
        value={search || selectedName}
        onChange={e => setSearch(e.target.value)}
        onFocus={() => setOpen(true)}
      />

      {/* Dropdown list */}
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
