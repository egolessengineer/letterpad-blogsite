export const metadata = {
  title: "Letterpad - Password Changed",
};

import { BsArrowRight } from "react-icons/bs";
import { CgPassword } from "react-icons/cg";
import { CiLock } from "react-icons/ci";
import { IoSparkles } from "react-icons/io5";
import { TbPassword } from "react-icons/tb";
import { Button } from "ui/isomorphic";

export default function PasswordChanged() {
  return (
    <form action="/api/auth/signin">
      <div className="flex flex-col h-full items-center justify-center  bg-gray-50 dark:bg-gray-900 px-4 md:px-6">
        <div className="max-w-lg w-full space-y-6 text-center">
          <h1 className="text-3xl md:md:text-4xl text-xl font-bold text-gray-900 dark:text-gray-50">
            <CiLock className="mr-2 inline-block h-8 w-8 text-primary" />
            Password Changed!
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            <IoSparkles className="mr-2 inline-block h-6 w-6 text-primary" />
            Your password has been changed successfully.
          </p>
          <div className="relative">
            <Button className="w-full" type="submit" variant={"success"}>
              <BsArrowRight className="mr-2 inline-block h-5 w-5" />
              Proceed to Login
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

PasswordChanged.isMessage = true;
