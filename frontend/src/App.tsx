function App() {
  return (
    <div>
      <h2 className="text-4xl font-semibold text-gray-800 text-center pt-14 pb-6">
        Welcome to Simple CMS 📝
      </h2>

      <p className="text-sm font-medium text-gray-600 text-center">
        This is a simple CMS built with React, TypeScript, and Tailwind CSS.
      </p>

      <h3 className="text-3xl text-gray-700 text-center pt-28">
        To create new relation
      </h3>
      <p className="text-sm font-medium text-gray-600 text-center pt-4">
        Click on the "+" button in the side navbar.
      </p>

      <h3 className="text-3xl text-gray-700 text-center pt-20">
        To view relations
      </h3>
      <p className="text-sm font-medium text-gray-600 text-center pt-4">
        You can view all the relation in the side navbar, just below the
        relations title
      </p>
    </div>
  );
}

export default App;
