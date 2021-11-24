const Notification = require("../model/Notification");
const User = require("../model/User");
const Faculty = require("../model/Faculty");

class notificationController {
    // [GET] /notification/
    async getAllNotification(req, res, next) {
        const notifications = await Notification.find()
            .populate("faculty")
            .sort({ createdAt: -1 });
        return res.status(200).json(notifications);
    }

    // [GET] /notification/:notifyID
    async getNotificationByID(req, res, next) {
        const { notifyID } = req.value.params;
        const notify = await Notification.findById(notifyID).populate(
            "faculty"
        );
        return res.status(200).json(notify);
    }

    // [GET] /notification/:slug/faculty
    async getNotificationByFaculty(req, res, next) {
        const { slug } = req.params;
        const faculty = await Faculty.findOne({ slug: slug });

        const allNotify = await Notification.find({ faculty: faculty._id })
            .populate("faculty")
            .sort({ createdAt: -1 });
        return res.status(200).json(allNotify);
    }

    // [GET] /notification/:userID/unread
    async getNotificationUnread(req, res, next) {
        const { userID } = req.value.params;
        // Get notify if doesn't exist in notify
        const notifyUnread = await Notification.find({
            read: { $nin: userID },
        });
        res.status(200).json(notifyUnread.length);
    }

    // [GET] /notification/new
    async getNewNotification(req, res, next) {
        const notify = await Notification.find()
            .sort({ createdAt: -1 })
            .limit(1)
            .populate("faculty");
        return res.status(200).json(notify[0]);
    }

    // [PATCH] /notification/:notifyID/read
    async setNotificationRead(req, res, next) {
        const { notifyID } = req.value.params;
        const { _id } = req.user;
        const user = await User.findById(_id);
        const notify = await Notification.findById(notifyID);

        if (user && notify) {
            const result = await notify.updateOne(
                { $addToSet: { read: _id } },
                {
                    upsert: true,
                    multi: true,
                }
            );
            res.status(200).json({
                success: true,
                result
            });
        } else {
            res.status(404).json("Notify/User not found !");
        }
    }

    // [POST] /notification/:userID/create
    async createNotification(req, res, next) {
        const { _id } = req.user;
        const newNotify = new Notification(req.value.body);
        newNotify.userID = _id;

        await newNotify.save();

        return res.status(201).json({
            success: true,
        });
    }

    // [PATCH] /notification/:notifyID
    async updateNotification(req, res, next) {
        const { _id } = req.user;
        const { notifyID } = req.value.params;
        const notification = await Notification.findById(notifyID);

        // Check owner notify
        if (notification.userID.toString() === _id.toString()) {
            await notification.updateOne({ $set: req.value.body });

            return res.status(200).json("The notification has been updated");
        } else {
            return res
                .status(403)
                .json("You can update only your notification !");
        }
    }

    // [DELETE] /notification/:notifyID
    async deleteNotification(req, res, next) {
        const { _id } = req.user;
        const { notifyID } = req.value.params;
        const notification = await Notification.findById(notifyID);
        // Check owner notify
        if (notification.userID.toString() === _id.toString()) {
            const result = await notification.deleteOne();

            return res.status(200).json({
                msg: "The notification has been deleted",
                result,
            });
        } else {
            return res
                .status(403)
                .json("You can delete only your notification !");
        }
    }
}

module.exports = new notificationController();
