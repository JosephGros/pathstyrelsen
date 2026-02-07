export default function ErrorBanner({ message }: { message: string }) {
  return (
    <div className="border border-gov-danger bg-gov-dangerBg rounded-2xl p-3">
      <div className="font-black text-gov-dangerText">Fel</div>
      <div className="text-[13px] text-gov-dangerText/90">{message}</div>
    </div>
  );
}
