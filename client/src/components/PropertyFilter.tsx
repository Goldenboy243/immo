import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PropertyFilterProps {
  statusFilter: string;
  typeFilter: string;
  onStatusChange: (value: string) => void;
  onTypeChange: (value: string) => void;
}

export default function PropertyFilter({ 
  statusFilter, 
  typeFilter, 
  onStatusChange, 
  onTypeChange 
}: PropertyFilterProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <div className="flex-1">
        <Select value={statusFilter} onValueChange={onStatusChange}>
          <SelectTrigger data-testid="select-status">
            <SelectValue placeholder="Filtrer par statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tous">Tous les statuts</SelectItem>
            <SelectItem value="vente">À vendre</SelectItem>
            <SelectItem value="location">À louer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1">
        <Select value={typeFilter} onValueChange={onTypeChange}>
          <SelectTrigger data-testid="select-type">
            <SelectValue placeholder="Filtrer par type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tous">Tous les types</SelectItem>
            <SelectItem value="maison">Maison</SelectItem>
            <SelectItem value="appartement">Appartement</SelectItem>
            <SelectItem value="terrain">Terrain</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
