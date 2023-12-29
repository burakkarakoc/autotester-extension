import Header from "../components/homepage/header.js";
import RequestDemoForm from "../components/forms/requestDemo.js";
import About from "../components/homepage/about.js";

export default function HomePage() {
  return (
    <div className="App bg-gray-800 text-gray-300">
      <Header />
      <About />
      <RequestDemoForm />
    </div>
  );
}
