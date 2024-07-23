import Booking from "../models/bookingModel.js";
import Notification from "../models/notificationModel.js";

function addMinutes(timestamp, minutes) {
    const timeDate = new Date(timestamp);
    timeDate.setMinutes(timeDate.getMinutes() + minutes);
    return timeDate;
}

export const handleTriggers = async () => {
    try {
    const currentTime = new Date();
    const expiringSoonTime = addMinutes(currentTime, 20); // Adjust the minutes as needed

    // Creating pick up bookings notification for bookings expiring soon
    const pickBookingsExpiringSoon = await Booking.find({
        pickUpDate: { $lte: expiringSoonTime, $gt: currentTime },
        pickup_notify: false,
        bookingStatus: "pending"
    });

    for(let i = 0; i < pickBookingsExpiringSoon.length; i++) {
        const notification = new Notification({
            isRead: false,
            title: "Booking",
            message: `Booking Pick up Date is expiring soon!`,
            booking: pickBookingsExpiringSoon[i]._id
        });

        await notification.save();

        await Booking.findByIdAndUpdate(pickBookingsExpiringSoon[i]._id, {pickup_notify: true });
    }

    // Creating return date bookings notification for bookings expiring soon
    const returnBookingsExpiringSoon = await Booking.find({
        returnDate: { $lte: expiringSoonTime, $gt: currentTime },
        returndate_notify: false,
        bookingStatus: "confirm"
    });

    for (let i = 0; i < returnBookingsExpiringSoon.length; i++) {
        const notification = new Notification({
            isRead: false,
            title: "Booking",
            message: `Booking Return Date is expiring soon!`,
            booking: returnBookingsExpiringSoon[i]._id
        });

        await notification.save();

        await Booking.findByIdAndUpdate(returnBookingsExpiringSoon[i]._id, {returndate_notify: true });
    }
    } catch (err) {
        console.error(err);
    }
};
