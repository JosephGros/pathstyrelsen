import { useState, useEffect } from 'react';

type TransferOwnerModalProps = {
  isOpen: boolean;
  onClose: () => void;
  registrationNumber: string;
  onConfirm: (
    newOwnerId: string,
    firstname: string,
    lastname: string,
    isCompany?: boolean,
    companyName?: string,
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
  const [isCompany, setIsCompany] = useState(false);
  const [companyNameInput, setCompanyNameInput] = useState('');

  useEffect(() => {
    setNewOwnerIdInput('');
    setFirstnameInput('');
    setLastnameInput('');
    setIsCompany(false);
    setCompanyNameInput('');
  }, [isOpen, registrationNumber]);

  if (!isOpen) return null;

  return (
    <div
      className="w-[390px] h-[660px] rounded-phone absolute inset-0 bg-black/55 flex items-center justify-center z-50"
      onMouseDown={onClose}
    >
      <div
        className="w-[340px] bg-gov-surface border border-gov-border rounded-2xl shadow-gov overflow-hidden gov-fade-in relative z-50"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="px-4 py-3 border-b border-gov-border">
          <div className="text-gov-text">Bekräfta ägarbyte</div>
          <div className="text-sm text-gov-muted">
            Fordon: <span className="font-mono">{registrationNumber}</span>
          </div>
        </div>

        <div className="p-4 space-y-2">
          <div className="flex gap-1 p-1 bg-gov-bg rounded-xl border border-gov-border mb-3">
            <button
              type="button"
              onClick={() => setIsCompany(false)}
              className={`flex-1 h-9 rounded-lg text-sm transition ${
                !isCompany
                  ? 'bg-gov-accent text-white'
                  : 'text-gov-text2 hover:text-gov-text'
              }`}
            >
              Privatperson
            </button>
            <button
              type="button"
              onClick={() => setIsCompany(true)}
              className={`flex-1 h-9 rounded-lg text-sm transition ${
                isCompany
                  ? 'bg-gov-accent text-white'
                  : 'text-gov-text2 hover:text-gov-text'
              }`}
            >
              Företag
            </button>
          </div>

          <div className="text-sm text-gov-text2">
            {isCompany ? 'Organisationsnummer' : 'Ny ägare (ID/personnummer)'}
          </div>
          <input
            value={newOwnerIdInput}
            onChange={(e) => setNewOwnerIdInput(e.target.value)}
            placeholder={isCompany ? 'XXXXXX-XXXX' : 'ÅÅÅÅMMDD-XXXX'}
            className="h-10 w-full px-3 rounded-xl bg-gov-bg text-sm text-gov-text border border-gov-border outline-none focus:ring-2 focus:ring-gov-accent placeholder:text-gov-muted"
          />

          {isCompany ? (
            <>
              <div className="text-sm text-gov-text2">Företagsnamn</div>
              <input
                value={companyNameInput}
                onChange={(e) => setCompanyNameInput(e.target.value)}
                placeholder="Företagsnamn"
                className="h-10 w-full px-3 rounded-xl bg-gov-bg text-sm text-gov-text border border-gov-border outline-none focus:ring-2 focus:ring-gov-accent placeholder:text-gov-muted"
              />
            </>
          ) : (
            <>
              <div className="text-sm text-gov-text2">Förnamn</div>
              <input
                value={firstnameInput}
                onChange={(e) => setFirstnameInput(e.target.value)}
                placeholder="Förnamn"
                className="h-10 w-full px-3 rounded-xl bg-gov-bg text-sm text-gov-text border border-gov-border outline-none focus:ring-2 focus:ring-gov-accent placeholder:text-gov-muted"
              />
              <div className="text-sm text-gov-text2">Efternamn</div>
              <input
                value={lastnameInput}
                onChange={(e) => setLastnameInput(e.target.value)}
                placeholder="Efternamn"
                className="h-10 w-full px-3 rounded-xl bg-gov-bg text-sm text-gov-text border border-gov-border outline-none focus:ring-2 focus:ring-gov-accent placeholder:text-gov-muted"
              />
            </>
          )}

          <div className="text-sm text-gov-muted">
            Uppdaterar ägarhistorik och nuvarande ägare direkt.
          </div>
        </div>

        <div className="px-4 py-3 border-t border-gov-border flex justify-end gap-2">
          <button
            onClick={onClose}
            className="h-10 px-4 rounded-xl bg-gov-card text-gov-text text-sm border border-gov-border hover:bg-[#263244] transition"
          >
            Avbryt
          </button>
          <button
            disabled={
              !newOwnerIdInput.trim() ||
              (isCompany
                ? !companyNameInput.trim()
                : !firstnameInput.trim() || !lastnameInput.trim())
            }
            onClick={() =>
              onConfirm(
                newOwnerIdInput.trim(),
                isCompany ? companyNameInput.trim() : firstnameInput.trim(),
                isCompany ? '' : lastnameInput.trim(),
                isCompany,
                isCompany ? companyNameInput.trim() : undefined,
              )
            }
            className="h-10 px-4 rounded-xl bg-gov-accent text-white text-sm hover:bg-gov-accentHover transition"
          >
            Bekräfta
          </button>
        </div>
      </div>
    </div>
  );
}
