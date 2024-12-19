import Image from "next/image";
import BackgroundGif from "@/public/assets/background-gif.gif";

export default function Account() {
  return (
    <div className="w-screen h-screen items-center justify-center flex">
      <form className="form-content mt-10 min-w-[50vh] max-w-[50vh] rounded-md items-center justify-center bg-slate-900">
        <div>
          <Image src={BackgroundGif} alt="" className="w-full rounded-t-md" />
        </div>
        <div className="font-nunito text-xl pb-5 w-full text-center p-5 font-semibold">
          Add Payment Method
        </div>
        <div className="flex justify-center">
          <div className="w-11/12 rounded-md h-5 p-5 flex items-center bg-slate-950"></div>
        </div>
      </form>
    </div>
  );
}
