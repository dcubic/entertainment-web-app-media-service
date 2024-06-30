import { ObjectId } from "mongodb";

export function randomObjectId(): string {
    const objectId = new ObjectId();
    return objectId.toString();
}