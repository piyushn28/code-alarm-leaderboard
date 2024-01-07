import Split from "react-split";
import Playground from "./playGround";
import ProblemDescription from "./problemDescription";

type WorkspaceProps = {
};


const Workspace: React.FC<WorkspaceProps> = ({  }) => {
	return (
		<Split className='split' minSize={0}>
			<ProblemDescription />
            
			<div className='bg-dark-fill-2'>
				<Playground />
			</div>
		</Split>
	);
};
export default Workspace;
