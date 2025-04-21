import React, { useState } from "react";
import { FiBookOpen, FiCheckCircle, FiCircle, FiWatch } from "react-icons/fi";
import { FiArrowUpRight } from "react-icons/fi";
import { MISSIONS, Mission } from "../chat/missionsData";

// 统一的图片URL
const UNIFIED_IMAGE_URL = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

interface GridCardsProps {
    onSelectSuggestion: (suggestion: string) => void;
    onCloseGridCards: () => void;
}

export const GridCards = ({ onSelectSuggestion, onCloseGridCards }: GridCardsProps) => {
    return (
        <div className="p-4 text-slate-800 md:p-12">
            <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-4 ">
                <TitleCard />
                {MISSIONS.map((mission) => (
                    <Card
                        key={mission.id}
                        mission={mission}
                        onSelectSuggestion={onSelectSuggestion}
                        onCloseGridCards={onCloseGridCards}
                    />
                ))}
            </div>
        </div>
    );
};

interface CardProps {
    mission: Mission;
    onSelectSuggestion: (suggestion: string) => void;
    onCloseGridCards: () => void;
}

const Card = ({ mission, onSelectSuggestion, onCloseGridCards }: CardProps) => {
    // 模拟任务完成状态 - 在实际应用中，这应该从后端或状态管理中获取
    // 这里我们使用任务ID的最后一个字符是否为偶数来模拟完成状态
    const isCompleted = true;

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        console.log("Card clicked:", mission.title, mission.suggestionText);
        onSelectSuggestion(mission.suggestionText);
        onCloseGridCards(); // 关闭网格视图
    };

    return (
        <a
            href="#"
            onClick={handleClick}
            className="group relative flex h-56 flex-col justify-end overflow-hidden p-6 transition-colors hover:bg-slate-100 md:h-80 md:p-9 border border-slate-300"
        >
            <div className="absolute left-3 top-5 z-10 flex items-center gap-1.5 text-xs uppercase text-slate-600 transition-colors duration-500 group-hover:text-slate-800">
                <FiWatch className="text-base" />
                <span>{mission.readTime || "5 mins"}</span>
            </div>
            <h2 className="relative z-10 text-3xl leading-tight text-slate-800 transition-transform duration-500 group-hover:-translate-y-3">
                {mission.title}
            </h2>
            <p className="relative z-10 text-sm text-slate-400 mt-2 line-clamp-2">
                {mission.description}
            </p>

            <div className="absolute right-3 top-4 z-10 flex items-center gap-1">
                {isCompleted ? (
                    <>
                        <FiCheckCircle className="text-2xl text-green-500" />
                        <span className="text-xs text-green-500">MISSION COMPLETED</span>
                    </>
                ) : (
                    <>
                        <FiCircle className="text-2xl text-slate-400" />
                        <span className="text-xs text-slate-400">MISSION TO DO</span>
                    </>
                )}
            </div>

            <div
                className="absolute bottom-0 left-0 right-0 top-0 opacity-0 blur-sm grayscale transition-all group-hover:opacity-10 group-active:scale-105 group-active:opacity-30 group-active:blur-0 group-active:grayscale-0"
                style={{
                    backgroundImage: `url(${UNIFIED_IMAGE_URL})`,
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
        <div className="group relative flex h-56 flex-col justify-between bg-slate-100 p-6 md:h-80 md:p-9 border border-slate-300">
            <h2 className="text-4xl uppercase leading-tight text-slate-800">
                <span className="text-slate-600 transition-colors duration-500 group-hover:text-slate-800">
                    Explore more
                </span>
                <br />
                Missions
            </h2>
        </div>
    );
}; 