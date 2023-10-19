export default function Loading() {
  return (
    <>
      <button type="button" className="bg-indigo-500 rounded-lg p-2" disabled>
        <svg
          className="animate-spin h-5 w-5 mr-3 ..."
          viewBox="0 0 24 24"
        ></svg>
        Carregando...
      </button>
      ​
    </>
  );
}
