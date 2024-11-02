/**
 * Replaces multiple occurrences of search text in a string with new values.
 * @returns {string} The modified string with replacements made.
 *
 * @customfunction
 */
function MULTI_SUBSTITUTE(text, ...opts) {
  for (let i = 0; i < opts.length; i += 2) {
    const searchValue = opts[i];
    const replaceValue = opts[i + 1];

    // Regex for case-insensitive search (flags 'gi')
    const regex = new RegExp(searchValue, 'gi');

    // Replace all occurrences of the search value
    text = text.replace(regex, replaceValue || '');
  }
  return text;
}
