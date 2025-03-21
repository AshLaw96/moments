import { fireEvent, render, screen, act, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "../components/NavBar";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { expect, vi } from "vitest"; 

test("renders Sign in and Sign up buttons again on log out", async () => {
  const mockSetCurrentUser = vi.fn(); 

  render(
    <Router>
      <CurrentUserContext.Provider value={{ currentUser: {username: "testuser"}, setCurrentUser: mockSetCurrentUser }}>
        <NavBar />
      </CurrentUserContext.Provider>
    </Router>
  );

  screen.debug();

  const signOutLink = await screen.findByRole("link", { name: "Sign out" });
  expect(signOutLink).toBeInTheDocument();

  // Ensure React updates the UI properly after clicking
  await act(async () => {
    fireEvent.click(signOutLink);
    mockSetCurrentUser(null); // Simulate state change
  });

  screen.debug(); // Debug the output after clicking

  // Wait for UI update before checking
  await waitFor(() => {
    expect(screen.getByRole("link", { name: "Sign in" })).toBeInTheDocument();
  });

  const signInLink = screen.getByRole("link", { name: "Sign in" });
  const signUpLink = screen.getByRole("link", { name: "Sign up" });

  expect(signInLink).toBeInTheDocument();
  expect(signUpLink).toBeInTheDocument();
});
