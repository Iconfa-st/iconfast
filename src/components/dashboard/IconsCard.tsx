import {Svg} from "@/app/types";
import {EventInfo, motion} from 'framer-motion';

interface IconsCardProps {
    icon: Svg;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    onClick?: () => void;
    selected?: boolean;
}

export default function IconsCard(props: IconsCardProps) {
    return (
        <motion.div
            className={`max-h-[20vh] rounded-3xl shadow-2xl flex flex-col items-center justify-center
            ${props.selected ? 'bg-purple-600' : 'bg-gray-200'}`}
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}
            viewport={{once: true}}
            onClick={props.onClick}
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
        >
            <div className={"flex justify-center max-w-[72px] p-2"}>
                <img src={`data:image/svg+xml;utf8,${encodeURIComponent(props.icon.content)}`}/>
            </div>
            <div className="px-8">
                <p className="text-xl font-semibold text-center text-gray-800">
                    {props.icon.name}
                </p>
            </div>
        </motion.div>
    )
}