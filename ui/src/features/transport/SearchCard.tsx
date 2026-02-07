type SearchCardProps = {
  searchValue: string;
  setSearchValue: (value: string) => void;
  onSearch: () => void;
  isLoading: boolean;
};

export default function SearchCard({ searchValue, setSearchValue, onSearch, isLoading }: SearchCardProps) {
  return (
    <div className="bg-gov-card border border-gov-border rounded-2xl p-3">
      <div className="text-xs font-extrabold text-gov-text2">Sök fordon</div>
      <div className="mt-2 flex gap-2">
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
          placeholder="Registreringsnummer eller fordons-ID"
          className="flex-1 h-10 px-3 rounded-xl bg-gov-bg text-gov-text border border-gov-border outline-none focus:ring-2 focus:ring-gov-accent placeholder:text-gov-muted"
        />
        <button
          onClick={onSearch}
          disabled={isLoading}
          className="h-10 px-4 rounded-xl font-extrabold bg-gov-accent text-white hover:bg-gov-accentHover transition disabled:opacity-50"
        >
          Sök
        </button>
      </div>
      <div className="mt-2 text-[11px] text-gov-muted">Ex: ABC123 eller veh_1001</div>
    </div>
  );
}
