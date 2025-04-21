import React from "react";
import { FiBookOpen, FiEye, FiWatch } from "react-icons/fi";
import { FiArrowUpRight } from "react-icons/fi";

export const GridCards = () => {
    return (
        <div className="p-4 text-slate-800 md:p-12">
            <div className="mx-auto grid max-w-5xl grid-cols-1 divide-y divide-slate-300 border border-slate-300 md:grid-cols-3 md:divide-x md:divide-y-0">
                <TitleCard />
                <Card
                    href="#"
                    title="AI Assistant Challenge"
                    readTime="15 mins"
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
                <Card
                    href="#"
                    title="Creative Writing Marathon"
                    readTime="30 mins"
                    src="https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=2379&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 divide-y divide-slate-300 border-x border-b border-slate-300 md:grid-cols-3 md:divide-x md:divide-y-0">
                <Card
                    href="#"
                    title="Digital Marketing Masterclass"
                    readTime="21 mins"
                    src="https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
                <Card
                    href="#"
                    title="Social Media Influence Challenge"
                    readTime="45 mins"
                    src="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
                <Card
                    href="#"
                    title="Brand Story Creation Camp"
                    readTime="14 mins"
                    src="https://images.unsplash.com/photo-1604076913837-52ab5629fba9?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
            </div>
        </div>
    );
};

interface CardProps {
    href: string;
    title: string;
    readTime: string;
    src: string;
}

const Card = ({ href, title, readTime, src }: CardProps) => {
    return (
        <a
            href={href}
            className="group relative flex h-56 flex-col justify-end overflow-hidden p-6 transition-colors hover:bg-slate-100 md:h-80 md:p-9"
        >
            <div className="absolute left-3 top-5 z-10 flex items-center gap-1.5 text-xs uppercase text-slate-600 transition-colors duration-500 group-hover:text-slate-800">
                <FiWatch className="text-base" />
                <span>{readTime}</span>
            </div>
            <h2 className="relative z-10 text-3xl leading-tight text-slate-800 transition-transform duration-500 group-hover:-translate-y-3">
                {title}
            </h2>

            <FiEye className="absolute right-3 top-4 z-10 text-2xl text-slate-600 transition-colors group-hover:text-slate-800" />

            <div
                className="absolute bottom-0 left-0 right-0 top-0 opacity-0 blur-sm grayscale transition-all group-hover:opacity-10 group-active:scale-105 group-active:opacity-30 group-active:blur-0 group-active:grayscale-0"
                style={{
                    backgroundImage: `url(${src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />

            <Corners />
        </a>
    );
};

const Corners = () => (
    <>
        <span className="absolute left-[1px] top-[1px] z-10 h-3 w-[1px] origin-top scale-0 bg-slate-800 transition-all duration-500 group-hover:scale-100" />
        <span className="absolute left-[1px] top-[1px] z-10 h-[1px] w-3 origin-left scale-0 bg-slate-800 transition-all duration-500 group-hover:scale-100" />
        <span className="absolute bottom-[1px] right-[1px] z-10 h-3 w-[1px] origin-bottom scale-0 bg-slate-800 transition-all duration-500 group-hover:scale-100" />
        <span className="absolute bottom-[1px] right-[1px] z-10 h-[1px] w-3 origin-right scale-0 bg-slate-800 transition-all duration-500 group-hover:scale-100" />
        <span className="absolute bottom-[1px] left-[1px] z-10 h-3 w-[1px] origin-bottom scale-0 bg-slate-800 transition-all duration-500 group-hover:scale-100" />
        <span className="absolute bottom-[1px] left-[1px] z-10 h-[1px] w-3 origin-left scale-0 bg-slate-800 transition-all duration-500 group-hover:scale-100" />
        <span className="absolute right-[1px] top-[1px] z-10 h-3 w-[1px] origin-top scale-0 bg-slate-800 transition-all duration-500 group-hover:scale-100" />
        <span className="absolute right-[1px] top-[1px] z-10 h-[1px] w-3 origin-right scale-0 bg-slate-800 transition-all duration-500 group-hover:scale-100" />
    </>
);

const TitleCard = () => {
    return (
        <div className="group relative flex h-56 flex-col justify-between bg-slate-100 p-6 md:h-80 md:p-9">
            <h2 className="text-4xl uppercase leading-tight text-slate-800">
                <span className="text-slate-600 transition-colors duration-500 group-hover:text-slate-800">
                    Explore more
                </span>
                <br />
                Campaigns
            </h2>
        </div>
    );
}; 