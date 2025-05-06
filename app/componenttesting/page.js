import React from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Search from "../components/ui/Search";
import Buttonarrow from "../components/ui/Buttonarrow";
import Counter from "../components/ui/Counter";
import Dropdown from "../components/ui/Dropdown";
import Star from "../components/ui/Star";
const ComponentTesting = () => {
  return (
    <div className="flex flex-col items-center gap-5 justify-center h-screen">
      <Button size="sm" variant="primary">
        Click me
      </Button>
      <Button size="md" variant="primary">
        Click me
      </Button>
      <Button size="lg" variant="primary">
        Click me
      </Button>
      <Button size="sm" variant="secondary">
        Click me
      </Button>
      <Button size="md" variant="secondary">
        Click me
      </Button>
      <Button size="lg" variant="secondary">
        Click me
      </Button>
      <Dropdown dropdown={["item 1", "item 2", "item 3"]} />
      <Counter />
      <Star className="text-[12px] before:bg-red-500 after:bg-red-500" />
      <Input placeholder="Enter your text" />
      <Search placeholder="Search" />
      <Buttonarrow variant="primary">Sign Up</Buttonarrow>
      <Buttonarrow variant="secondary">View Demo</Buttonarrow>
    </div>
  );
};

export default ComponentTesting;
