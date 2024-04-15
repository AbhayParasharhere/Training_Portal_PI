import { useState } from "react";
import { acceptInvite, inviteUser } from "../../Firebase/inviteLogic";

const InvitePage = () => {
  const [email, setEmail] = useState("");
  const handleCreateInvite = async () => {
    const res = await inviteUser(email);
    console.log(res);
  };
  const handleAcceptInvite = async () => {
    const res = await acceptInvite(email);
    console.log(res);
  };

  return (
    <div>
      <h2>Invite User</h2>
      <div>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleCreateInvite}>Invite</button>
        <button onClick={handleAcceptInvite}>Accept Invite</button>
      </div>
    </div>
  );
};

export default InvitePage;
