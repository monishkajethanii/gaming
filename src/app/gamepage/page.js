import Slideshow from "./slideshow";
import Card from "./cards";
import './styles.module.css';
import Nav from "../Nav";
export default function Page() {
  return (
    <div className="bg-black">
      <div className="">
        <Nav/>
        <Slideshow />
      </div>
      <div>
      <Card/>
      </div>
    </div>
  );
}
