function shuffleWords(message) {
  const words = message.split(" ");
  for (let i = words.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [words[i], words[j]] = [words[j], words[i]];
  }
  return words.join(" ");
}

function mutateMessage(message) {
  const corruptions = [
    () => message.split(" ").slice(0, 2).join(" "),    // cut
    () => shuffleWords(message),                       // shuffle
    () => "🤖 Translation error.",                      // nonsense
    () => message.split("").reverse().join(""),        // reverse
  ];
  return corruptions[Math.floor(Math.random() * corruptions.length)]();
}

module.exports = mutateMessage;
