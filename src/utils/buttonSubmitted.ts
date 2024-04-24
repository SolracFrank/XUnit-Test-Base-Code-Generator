const timeOuts = new Map();

export default function submitted(
  btn: HTMLButtonElement,
  submittedText: string
) {
  const initialText = btn.getAttribute("data-text")!;

  if (timeOuts.has(btn)) {
    clearTimeout(timeOuts.get(btn));
    timeOuts.delete(btn);
  }
  btn.innerText = submittedText;

  const timeOutId = setTimeout(() => {
    btn.innerText = initialText;
    timeOuts.delete(btn);
  }, 5000);
  timeOuts.set(btn, timeOutId);
}
