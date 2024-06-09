export default function ErrorMessage({ text }) {
  return (
    <div className="flex gap-1 items-center justify-end text-[#FF808B] text-sm mt-1">
      <i className="pi pi-exclamation-circle"></i>
      <span className="leading-none"> {text}</span>
    </div>
  )
}
