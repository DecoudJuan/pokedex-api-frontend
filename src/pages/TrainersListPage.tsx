import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTrainer, updateTrainer, listTrainers } from "../lib/api";
import type { Trainer } from "../lib/types";

import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import TrainerCard from "../components/TrainerCard";
import EditTrainersModal from "../components/EditTrainersModal";
import MenuCard from "../components/MenuCard";
import { Plus } from "lucide-react";

export default function TrainersListPage() {
  const [q, setQ] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [selected, setSelected] = useState<Trainer | null>(null);

  const qc = useQueryClient();
  const queryKey = ["trainers"];

  const { data: trainers = [], isLoading, isError } = useQuery<Trainer[]>({
    queryKey,
    queryFn: () => listTrainers({ page: 1, limit: 12 }),
  });

  const remove = useMutation({
    mutationFn: (id: string) => deleteTrainer(id),
    onSuccess: () => qc.invalidateQueries({ queryKey }),
  });

  const saveEdit = useMutation({
    mutationFn: (payload: { id: string; values: { name: string; type: string; imageUrl?: string | null } }) =>
      updateTrainer(payload.id, payload.values),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey });
      setEditOpen(false);
      setSelected(null);
    },
  });

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return trainers;
    return trainers.filter((t) => String(t.name).toLowerCase().includes(s));
  }, [trainers, q]);

  
  const handleDelete = async (id: string) => {
    await remove.mutateAsync(id);
  };

  const handleEdit = (id: string) => {
    const current = trainers.find((t) => t.id === id) ?? null;
    setSelected(current);
    setEditOpen(true);
  };

  const submitEdit = async (values: { name: string; type: string; imageUrl?: string | null }) => {
    if (!selected) return;
    await saveEdit.mutateAsync({ id: selected.id, values });
  };

  return (
    <div className="min-h-screen bg-red-600">
      <Header />
      <SearchBar value={q} onChange={setQ} />

      <div className="max-w-5xl mx-auto px-4 py-4">
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          {isLoading && <div className="p-6">Cargando…</div>}
          {isError && <div className="p-6 text-red-600">Error cargando</div>}

          {!isLoading && !isError && filtered.length === 0 && (
            <div className="p-6 text-slate-600">No hay entrenadores.</div>
          )}

          {!isLoading && !isError && filtered.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <MenuCard
                to="/trainers/new"
                icon={<Plus className="w-8 h-8 text-red-600" />}
                title="Registrar entrenador"
                description="Agregar uno nuevo"
              />
              {filtered.map((p) => (
                <TrainerCard
                  key={p.id}
                  id={p.id}
                  name={p.name}
                  imageUrl={p.imageUrl ?? undefined}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))}
            </div>
          )}

          {(remove.isPending || saveEdit.isPending) && (
            <div className="p-2 text-sm text-slate-500">
              {remove.isPending ? "Eliminando…" : "Guardando cambios…"}
            </div>
          )}
        </div>
      </div>

      <EditTrainersModal
        open={editOpen}
        trainer={selected}
        onClose={() => {
          setEditOpen(false);
          setSelected(null);
        }}
        onSubmit={submitEdit}
        submitting={saveEdit.isPending}
      />
    </div>
  );
}
