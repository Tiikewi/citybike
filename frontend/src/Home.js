import React from "react";

const Home = () => {
  return (
    <div>
      <h3>Usage</h3>
      <span>
        Display journeys and stations from navbar links above. <br /> You can
        navigate tables using arrow keys, or by buttons on bottom right corner
        of the table.
      </span>
      <hr />
      <h3>Make sure you did insert .env file to directory frontend/</h3>
      <p>
        If received by email, make sure env file is named ".env" with dot and
        not just "env".{" "}
      </p>
      <hr />
      <h3>Todos</h3>
      <span>
        <ul>
          <li>Make code more modular.</li>
          <li>Improve api calls on front.</li>
          <li>Implement better error handling, especially on frontend.</li>
          <li>Implement more features.</li>
        </ul>
      </span>
    </div>
  );
};

export default Home;
