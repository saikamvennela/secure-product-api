import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err);

  // Invalid JSON
  if (err instanceof SyntaxError && "body" in err) {
    res.status(400).json({
      success: false,
      message: "Invalid JSON format"
    });

    return;
  }

  // Request body too large
  if (err.type === "entity.too.large") {
    res.status(400).json({
      success: false,
      message: "Request body is too large. Maximum size is 10 KB."
    });

    return;
  }

  res.status(500).json({
    success: false,
    message: "Internal server error"
  });
};