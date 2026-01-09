# Custom Hooks

A collection of reusable React hooks for the HCCC CRM application.

## Available Hooks

### `useModal`
Manages modal state (open/close, type, editing item).

```jsx
import { useModal } from '../hooks';

const { isOpen, modalType, openModal, closeModal } = useModal();

// Open modal
openModal('addLead', leadData);

// Close modal
closeModal();
```

### `useExpandedItems`
Manages expanded/collapsed state for lists (leads, customers, etc.).

```jsx
import { useExpandedItems } from '../hooks';

const { expandedItems, toggleItem, isExpanded } = useExpandedItems();

// Toggle item
toggleItem(leadId);

// Check if expanded
if (isExpanded(leadId)) { ... }
```

### `useWeather`
Fetches weather data based on address containing zip code.

```jsx
import { useWeather } from '../hooks';

const { weather, isLoading, error } = useWeather(businessInfo.address);

// weather: { temperature, description, icon, location }
```

### `useClickOutside`
Detects clicks outside an element.

```jsx
import { useClickOutside } from '../hooks';

const ref = useClickOutside(() => {
  setIsOpen(false);
}, isOpen);
```

### `useCollapsible`
Manages collapsible section state.

```jsx
import { useCollapsible } from '../hooks';

const { isCollapsed, toggle, expand, collapse } = useCollapsible(true);
```

### `useDropdown` / `useMultipleDropdowns`
Manages dropdown state (single or multiple).

```jsx
import { useDropdown, useMultipleDropdowns } from '../hooks';

// Single dropdown
const { openId, toggle, isOpen } = useDropdown();

// Multiple dropdowns
const { toggle, isOpen, closeAll } = useMultipleDropdowns();
```

### `useSearch`
Manages search functionality with filtering.

```jsx
import { useSearch } from '../hooks';

const { searchTerm, setSearchTerm, filteredItems } = useSearch(items);

// Custom search function
const { filteredItems } = useSearch(items, (items, term) => {
  return items.filter(item => item.name.includes(term));
});
```

### `useLocalStorage`
Syncs state with localStorage.

```jsx
import { useLocalStorage } from '../hooks';

const [value, setValue] = useLocalStorage('myKey', 'defaultValue');
```

### `useDebounce`
Debounces a value (useful for search inputs).

```jsx
import { useDebounce } from '../hooks';

const [searchTerm, setSearchTerm] = useState('');
const debouncedSearchTerm = useDebounce(searchTerm, 500);
```

### `useToggle`
Manages boolean toggle state.

```jsx
import { useToggle } from '../hooks';

const [isOpen, toggle, setValue, setTrue, setFalse] = useToggle(false);
```

### `useArray`
Manages array state with common operations.

```jsx
import { useArray } from '../hooks';

const { array, push, remove, update, clear } = useArray([1, 2, 3]);

push(4);
remove(0);
update(1, 99);
clear();
```

## Usage

Import hooks from the hooks folder:

```jsx
import { useModal, useExpandedItems, useWeather } from '../hooks';
```

Or import individually:

```jsx
import { useModal } from '../hooks/useModal';
```

## Examples

### Using multiple hooks together

```jsx
import { useModal, useExpandedItems, useCollapsible } from '../hooks';

function MyComponent() {
  const { isOpen, openModal, closeModal } = useModal();
  const { expandedItems, toggleItem } = useExpandedItems();
  const { isCollapsed, toggle } = useCollapsible();
  
  // ... component logic
}
```

