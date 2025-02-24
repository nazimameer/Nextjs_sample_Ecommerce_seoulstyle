export interface SearchState {
  search: string;
  showSearch: boolean;
  setSearch: (value: string) => void;
  toggleShowSearch: () => void;
}