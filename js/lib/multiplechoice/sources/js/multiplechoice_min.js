!function(){
	var t=function(){
		function t(){
			function t(){
				function t(){
					h.currentQuestion--,q()}
				function n(){h.currentQuestion++,q()}
				function s(){
						var t=i.getGroupOrder(this);l(),d(t,j.SELECTED),h.userAnswers[h.currentQuestion][0]=t,g.attr("disabled",!1)}
				function r(){if(v[h.userAnswers[h.currentQuestion][0]]===h.questions[h.currentQuestion-1].rightAnswer)d(h.userAnswers[h.currentQuestion][0],j.RIGHT);
					else{d(h.userAnswers[h.currentQuestion][0],j.WRONG);
						for(var t=1;t<v.length;t++)v[t]===h.questions[h.currentQuestion-1].rightAnswer&&d(t,j.RIGHT)}}function o(){
							$(this).attr("disabled",!0),w.unbind("click"),h.userAnswers[h.currentQuestion][1]=!0,r()}
							function u(){for(var t=0,e=0,n=0,i=0;i<h.questions.length;i++)0===h.userAnswers[i+1][0]?t++:v[h.userAnswers[i+1][0]]===h.questions[i].rightAnswer?e++:n++;
							$("#linden_RightAnswersCount").html("Doğru cevap sayısı: "+e),$("#linden_WrongAnswersCount").html("Yanlış cevap sayısı: "+n),
							$("#linden_EmptyAnswersCount").html("Boş geçilen soru sayısı: "+t),$("#linden_SuccessRate").html("Başarı yüzdesi: %"+parseInt(e/h.questions.length*100)),Q.show()}
							function c(){Q.hide()}function a(){Q.hide(),h.initialize(MultipleChoiceQuestionDataJSON)}function d(t,e){$("#linden_QuestionChoice_"+t).css("border-color",e),
							$("#linden_QuestionChoiceContainerCell_"+t).css("color",e)}
							function l(){$(".linden_QuestionChoice").css("border-color",j.DEFAULT),
							$(".linden_QuestionChoiceContainerCell").css("color",j.DEFAULT)}
							var h=this,f=$("#linden_QuestionText"),b=$(".linden_QuestionChoiceText"),_=$("#linden_QuestionOrder"),g=$("#linden_ShowAnswerButton").bind("click",o),
							A=($("#linden_SendButton").bind("click",u),$("#questionNavigationText")),Q=$("#linden_ResultPanel").hide(),w=($("#linden_CloseResultButton").bind("click",c),
								$("#linden_RestartButton").bind("click",a),$(".linden_QuestionChoiceContainer")),
							m=$("#linden_QuestionPrevButton").bind("click",t),p=$("#linden_QuestionNextButton").bind("click",n),v=["","A","B","C","D","E"],
							j={RIGHT:"green",WRONG:"red",DEFAULT:"#fc3",SELECTED:"black"};this.initialize=function(t){
								h.questions=null,h.assessmentQuestionsData=new e(t),h.currentQuestion=1,h.userAnswers=null,h.questions=null,O(),h.userAnswers=[];for(var n=1;
									n<=h.questions.length;n++)h.userAnswers[n]=[0,!1];q()};var O=function(){h.questions=h.assessmentQuestionsData.getById()},
								q=function(){var t=h.currentQuestion-1;_.html(t+1),f.html(h.questions[t].questionText);for(var e=0;e<h.questions[t].choices.length;e++)
									$(b[e]).html(h.questions[t].choices[e]);A.html("SORU "+h.currentQuestion+" / "+h.questions.length),1===h.currentQuestion?(m.attr("disabled",!0),
										p.attr("disabled",!1)):h.currentQuestion===h.questions.length?p.attr("disabled",!0):(m.attr("disabled",!1),p.attr("disabled",!1)),
									g.attr("disabled",!0),l(),w.unbind("click"),h.userAnswers[h.currentQuestion][1]?r():(w.bind("click",s),
										0!==h.userAnswers[h.currentQuestion][0]&&(d(h.userAnswers[h.currentQuestion][0],j.SELECTED),g.attr("disabled",!1)))}}t.apply(this,arguments)}return t}(),
									e=function(){function t(t){this._data=[];var e=this;if(this.isFetched=!1,!e.isFetched&&"undefined"!=typeof t)
									{for(var n in t.Assessment)val=t.Assessment[n],this.add(val.id,val.questionText,val.rightAnswer,val.choices);e.isFetched=!0}}return t.prototype={get data(){
										return this._data},set data(t){this._data=t}},t.prototype.add=function(t,e,i,s){var r;r=new n,r.id=t,r.questionText=e,r.rightAnswer=i,r.choices=s,this.data.push(r)},t.prototype.getById=function(){for(var t=[],e=1;e<=this.data.length;e++)t.push(i.getObjectByParam(e,this.data,"id"));return t},t}(),n=function(){function t(){this._id,this._questionText,this._rightAnswer,this._choices}return t.prototype={get id(){return this._id},set id(t){this._id=t},get questionText(){return this._questionText},set questionText(t){this._questionText=t},get rightAnswer(){return this._rightAnswer},set rightAnswer(t){this._rightAnswer=t},get choices(){return this._choices},set choices(t){this._choices=t}},t}(),i=function(){function t(){}return t.getObjectByParam=function(t,e,n){for(var i=0;i<e.length;i++)if(e[i][n]==t)return e[i];return null},t.getGroupOrder=function(t){var e=$(t).attr("id").split("_");return parseInt(e[2],10)},t.createDOM=function(t,e,n){var i=$(document.createElement(t));return"undefined"!=typeof e&&""!=e.trim()&&i.attr("id",e.trim()),"undefined"!=typeof n&&""!=n.trim()&&i.attr("class",n.trim()),i},t.addDOM=function(t,e,n,i){var s=$(document.createElement(t));return"undefined"!=typeof n&&""!=n.trim()&&s.attr("id",n.trim()),"undefined"!=typeof i&&""!=i.trim()&&s.attr("class",i.trim()),e.append(s),s},t.trace=function(t){console.info("-----> "+t)},t}();
							$(document).ready(function(){var e=new t;e.initialize(MultipleChoiceQuestionDataJSON)})}();