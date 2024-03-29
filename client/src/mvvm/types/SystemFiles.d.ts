import FilesType from "./File";
import TagviewModel from "../viewmodels/TagviewModel";

interface SystemFileType extends FilesType {
  name?: string;
  dayLifeSpan?: number;
  tagId?: string[];
}

export default SystemFileType;