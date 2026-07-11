import { Request, Response } from "express";

import userService from "../services/user.service";

export const getStores = async (

    req: Request,

    res: Response

) => {

    try {

        const result = await userService.getStores(

            req.query,

            (req as any).user.id

        );

        return res.status(200).json({

            success: true,

            message: "Stores fetched successfully",

            data: result

        });

    }

    catch (error: any) {

        return res.status(400).json({

            success: false,

            message: error.message

        });

    }

};

export const submitRating = async (

    req: Request,

    res: Response

) => {

    try {

        const result = await userService.submitRating(

            (req as any).user.id,

            req.body

        );

        return res.status(201).json({

            success: true,

            message: "Rating submitted successfully",

            data: result

        });

    }

    catch (error: any) {

        return res.status(400).json({

            success: false,

            message: error.message

        });

    }

};

export const updateRating = async (

    req: Request,

    res: Response

) => {

    try {

        const result = await userService.updateRating(

            (req as any).user.id,

            Number(req.params.storeId),

            req.body.rating

        );

        return res.status(200).json({

            success: true,

            message: "Rating updated successfully",

            data: result

        });

    }

    catch (error: any) {

        return res.status(400).json({

            success: false,

            message: error.message

        });

    }

};

export const changePassword = async (

    req: Request,

    res: Response

) => {

    try {

        const result = await userService.changePassword(

            (req as any).user.id,

            req.body.oldPassword,

            req.body.newPassword

        );

        return res.status(200).json({

            success: true,

            ...result

        });

    }

    catch (error: any) {

        return res.status(400).json({

            success: false,

            message: error.message

        });

    }

};