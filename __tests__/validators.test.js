const { validateFormData } = require("../utils/validator");

describe("Form Validation", () => {
  test("should validate valid form data", () => {
    const validData = {
      name: "John Doe",
      email: "john@example.com",
      age: 30,
      message: "A pretty normal message, long enough.",
    };

    const result = validateFormData(validData);
    expect(result.isValid).toBe(true);
    expect(result.errors.length).toBe(0);
  });

  test("should reject invalid name", () => {
    const invalidData = {
      name: "j",
      email: "john@example.com",
      age: 30,
      message: "A pretty normal message, long enough.",
    };

    const result = validateFormData(invalidData);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain(
      "Name is required and must be at least 2 characters",
    );
  });

  test("should reject invalid name", () => {
    const invalidData = {
      name: "John Doe",
      email: "j",
      age: 30,
      message: "A pretty normal message, long enough.",
    };

    const result = validateFormData(invalidData);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain("Valid email address is required");
  });

  test("should reject invalid name", () => {
    const invalidData = {
      name: "John Doe",
      email: "johndoe@example.com",
      age: 3,
      message: "A pretty normal message, long enough.",
    };

    const result = validateFormData(invalidData);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain("Age must be a number between 18 and 120");
  });

  test("should reject invalid name", () => {
    const invalidData = {
      name: "John Doe",
      email: "johndoe@example.com",
      age: 30,
      message: "short",
    };

    const result = validateFormData(invalidData);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain(
      "Message must be at least 10 characters long",
    );
  });

  test("should reject invalid name", () => {
    const invalidData = {
      name: "John Doe",
      email: "johndoe@example.com",
      age: "qwerty",
      message: "A pretty normal message, long enough.",
    };

    const result = validateFormData(invalidData);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain("Age must be a number between 18 and 120");
  });
});
