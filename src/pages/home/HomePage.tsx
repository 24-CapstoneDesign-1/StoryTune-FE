import { useUserStore } from "@/shared/hooks/stores/useUserStore";
import { Header } from "@/widgets"
const HomePage = () => {
    const userStore = useUserStore();

    return (
        <>
            <Header />
        </>
    );
};

export default HomePage;