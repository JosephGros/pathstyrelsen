import { useState, useEffect } from 'react';

type TransferOwnerModalProps = {
  isOpen: boolean;
  onClose: () => void;
  registrationNumber: string;
  onConfirm: (
    newOwnerId: string,
    firstname: string,
    lastname: string,
  ) => void | Promise<void>;
};

export default function TransferOwnerModal({
  isOpen,
  onClose,
  registrationNumber,
  onConfirm,
}: TransferOwnerModalProps) {
  const [newOwnerIdInput, setNewOwnerIdInput] = useState('');
  const [firstnameInput, setFirstnameInput] = useState('');
  const [lastnameInput, setLastnameInput] = useState('');
  useEffect(() => {
    setNewOwnerIdInput('');
    setFirstnameInput('');
    setLastnameInput('');
  }, [isOpen, registrationNumber]);

  if (!isOpen) return null;

  return (
    <div
      className="w-[390px] h-[660px] rounded-phone absolute inset-0 bg-black/55 flex items-center justify-center"
      onMouseDown={onClose}
    >
      <div
        className="w-[340px] bg-gov-surface border border-gov-border rounded-2xl shadow-gov overflow-hidden gov-fade-in"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="px-4 py-3 border-b border-gov-border">
          <div className="font-black text-gov-text">Bekräfta ägarbyte</div>
          <div className="text-[11px] text-gov-muted">
            Fordon: <span className="font-mono">{registrationNumber}</span>
          </div>
        </div>

        <div className="p-4 space-y-2">
          <div className="text-xs font-extrabold text-gov-text2">
            Ny ägare (ID/personnummer)
          </div>
          <input
            value={newOwnerIdInput}
            onChange={(e) => setNewOwnerIdInput(e.target.value)}
            placeholder="ÅÅÅÅMMDD-XXXX"
            className="h-10 w-full px-3 rounded-xl bg-gov-bg text-gov-text border border-gov-border outline-none focus:ring-2 focus:ring-gov-accent placeholder:text-gov-muted"
          />
          <div className="text-xs font-extrabold text-gov-text2">Förnamn</div>
          <input
            value={firstnameInput}
            onChange={(e) => setFirstnameInput(e.target.value)}
            placeholder="Förnamn"
            className="h-10 w-full px-3 rounded-xl bg-gov-bg text-gov-text border border-gov-border outline-none focus:ring-2 focus:ring-gov-accent placeholder:text-gov-muted"
          />
          <div className="text-xs font-extrabold text-gov-text2">Efternamn</div>
          <input
            value={lastnameInput}
            onChange={(e) => setLastnameInput(e.target.value)}
            placeholder="Efternamn"
            className="h-10 w-full px-3 rounded-xl bg-gov-bg text-gov-text border border-gov-border outline-none focus:ring-2 focus:ring-gov-accent placeholder:text-gov-muted"
          />
          <div className="text-[11px] text-gov-muted">
            Uppdaterar ägarhistorik och nuvarande ägare direkt.
          </div>
        </div>

        <div className="px-4 py-3 border-t border-gov-border flex justify-end gap-2">
          <button
            onClick={onClose}
            className="h-10 px-4 rounded-xl font-extrabold bg-gov-card text-gov-text border border-gov-border hover:bg-[#263244] transition"
          >
            Avbryt
          </button>
          <button
            disabled={
              !newOwnerIdInput.trim() ||
              !firstnameInput.trim() ||
              !lastnameInput.trim()
            }
            onClick={() =>
              onConfirm(
                newOwnerIdInput.trim(),
                firstnameInput.trim(),
                lastnameInput.trim(),
              )
            }
            className="h-10 px-4 rounded-xl font-extrabold bg-gov-accent text-white hover:bg-gov-accentHover transition"
          >
            Bekräfta
          </button>
        </div>
      </div>
    </div>
  );
}
