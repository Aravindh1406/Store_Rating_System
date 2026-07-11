import User from "./user";
import Store from "./store";
import Rating from "./rating";

User.hasMany(Store, {
    foreignKey: "ownerId",
    as: "stores",
});

Store.belongsTo(User, {
    foreignKey: "ownerId",
    as: "owner",
});

User.hasMany(Rating, {
    foreignKey: "userId",
    as: "ratings",
});

Rating.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
});

Store.hasMany(Rating, {
    foreignKey: "storeId",
    as: "ratings",
});

Rating.belongsTo(Store, {
    foreignKey: "storeId",
    as: "store",
});

export { User, Store, Rating };