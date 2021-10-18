import React from "react";
import "./CoursesPage.scss";
import CourseCard from "../../user-interface/components/CourseCard";
import {CourseSearchResultList} from '../../web-service/models/CourseSearchResultList';

interface CoursesPageProperties {
}

interface CoursesPageState {
	courseSerachState: CourseSearchResultList;
	serachText:string;
	prevState:CourseSearchResultList;
}

class CoursesPage extends React.Component<CoursesPageProperties, CoursesPageState> {

	constructor(props:CoursesPageProperties){
		super(props);
		this.state={courseSerachState:{publicLearningPathResults:[],count:0}, serachText:"",
		prevState:{publicLearningPathResults:[],count:0}}
	}


	//run this command to connect the api -> lcp --proxyUrl https://lx.festo.com

	componentDidMount()
	{
		fetch('http://localhost:8010/proxy/SearchService/api/search/learning-paths/public')
		.then(response => response.json() as Promise<CourseSearchResultList>)
				.then(data => {
					this.setState({courseSerachState:data,prevState:data});
				}).catch(function (error) {
					console.log(error);
				});
	}

	onChangeSerach=(event:any)=>{
		if(event.target.value!==""){
			this.setState({serachText:event.target.value});
		fetch(`http://localhost:8010/proxy/SearchService/api/search/learning-paths/public?term=${this.state.serachText}&page=1&size=20&sortOrder=1`)
		.then(response => response.json() as Promise<CourseSearchResultList>)
				.then(data => {
					this.setState({courseSerachState:data});
				}).catch(function (error) {
					console.log(error);
				});
		}
		else{
			this.setState({courseSerachState:this.state.prevState,serachText:event.target.value});

		}
		
	}

	public render(): JSX.Element {


		return (
			<div className="courses-page" >
				<input type="text" id="myInput" placeholder=" Search Courses Here......"
                    name="search" onChange={(e)=>{this.onChangeSerach(e)}} value={this.state.serachText}/>
				{this.state.courseSerachState.publicLearningPathResults.length>0 ?
				<div className="wrap-up">
					
					{this.state.courseSerachState.publicLearningPathResults.map((item,index)=>{
						return <div className="col-4" key={index+item.id.toString()} >
							<CourseCard course={item} user={item.user.firstName+' '+item.user.lastName} />	
						</div>
					})}
				</div>
				:"No-Contnet"
				}
			</div>
		);
	}
}

export default CoursesPage;
