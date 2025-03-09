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
});
