export default function filter({ Filter, arr, isAdmin }) {
  const filteredByPublish = !isAdmin ? arr.filter((e) => e.status === 'publish') : arr;

  const filteredExerciseSearch = Filter.search
    ? filteredByPublish.filter((e) => e.labels.find((i) => i.includes(Filter.search.toLowerCase())))
    : filteredByPublish;

  const filteredExerciseDiff = Filter.difficulty
    ? filteredExerciseSearch.filter((e) => e.difficulty === Filter.difficulty)
    : filteredExerciseSearch;

  const filteredExercise = Filter.type
    ? filteredExerciseDiff.filter((e) => e.type === Filter.type)
    : filteredExerciseDiff;

  return filteredExercise;
}
