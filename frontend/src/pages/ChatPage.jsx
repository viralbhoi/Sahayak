import { useParams } from "react-router-dom";
import Chat from "../components/Chat";
import DashboardLayout from "../components/DashboardLayout";

function ChatPage() {
    const { jobId } = useParams();

    return (
        <DashboardLayout>
            <Chat jobId={jobId} />
        </DashboardLayout>
    );
}

export default ChatPage;
