import { Badge } from "./ui/badge";

export const PageHeader = ({ icon, count, title, description, actionButton }: { icon: React.ReactNode; count?: number; title: string; description?: string; actionButton?: React.ReactNode }) => {
    return (
        <div className="flex items-center justify-between p-2">
            <div>
                <h1 className="font-bold text-2xl">
                    {title}
                    {count && (
                        <Badge className="ml-2">({count})</Badge>
                    )}
                </h1>
                <p className="text-muted-foreground">{description}</p>
            </div>
            <div>
                {actionButton}
            </div>
        </div>
    );
};