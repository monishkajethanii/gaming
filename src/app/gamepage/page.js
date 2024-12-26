import Slideshow from "./slideshow";
import Card from "./cards";
import styles from './styles.module.css';
export default function Page() {
  return (
    <div className="bg-black ml-5 mr-5 mt-5">
      <div className="p-5 ">
        <Slideshow />
      </div>
      <div>
      <Card/>
      </div>
    </div>
  );
}
