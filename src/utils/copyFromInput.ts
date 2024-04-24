export function copyFromInput(input: HTMLInputElement | HTMLTextAreaElement) {
  input.select();
  navigator.clipboard.writeText(input.value).then(() => {});

  input.blur();
}
