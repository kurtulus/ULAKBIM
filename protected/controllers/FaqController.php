<?php
class FaqController extends Controller
{
	/**
	 * @var string the default layout for the views. Defaults to '//layouts/column2', meaning
	 * using two-column layout. See 'protected/views/layouts/column2.php'.
	 */
	public $layout='//layouts/column2';

	/**
	 * @return array action filters
	 */
	public function filters()
	{
		return array(
			'accessControl', // perform access control for CRUD operations
			'postOnly + delete', // we only allow deletion via POST request
		);
	}

	/**
	 * Specifies the access control rules.
	 * This method is used by the 'accessControl' filter.
	 * @return array access control rules
	 */
	public function accessRules()
	{
		return array(
			array('allow',  // allow all users to perform 'index' and 'view' actions
				'actions'=>array('index','view'),
				'users'=>array('*'),
			),
			array('allow', // allow authenticated user to perform 'create' and 'update' actions
				'actions'=>array('create','update','searchKey','category','keyword'),
				'users'=>array('@'),
			),
			array('allow', // allow admin user to perform 'admin' and 'delete' actions
				'actions'=>array('admin','delete'),
				'users'=>array('admin'),
			),
			array('deny',  // deny all users
				'users'=>array('*'),
			),
		);
	}

	/**
	 * Displays a particular model.
	 * @param integer $id the ID of the model to be displayed
	 */
	public function actionView($id)
	{
		$this->render('view',array(
			'model'=>$this->loadModel($id),
		));
	}

	/**
	 * Creates a new model.
	 * If creation is successful, the browser will be redirected to the 'view' page.
	 */
	public function actionCreate()
	{
		//creates the form model to collect data
		$model=new FaqCreateForm;

		//creates faq
		$faq= new Faq;

		$id=functions::new_id(15);
		//sets faq->id,lang,rate
		//$faq->faq_id = $id;
		$faq->lang=$this->getCurrentLang();
		$faq->rate=0;
		$model->faq_id=$id;
		$model->faq_lang=$this->getCurrentLang();

		//gets categories to display in the form view
		$all_categories=FaqCategory::model()->findAll(array(
			'condition'=>'lang=:lang',
			'params'=>array(':lang'=>$model->faq_lang)
			));
		foreach ($all_categories as $key => $category) {
			$categories[$category->faq_category_id]=$category->faq_category_title;
		}
		// Uncomment the following line if AJAX validation is needed
		// $this->performAjaxValidation($model);

		if(isset($_POST['FaqCreateForm']))
		{
			$model->attributes=$_POST['FaqCreateForm'];

			//sets faq_question and faq_answer
			$faq->faq_question=$model->faq_question;
			$faq->faq_answer=$model->faq_answer;
			if($faq->save())
			{
				//if faq keywords entered goes in
				if ($_POST['FaqCreateForm']['faq_keywords']) {
					//keywordleri , ile ayırarak alıyorum
					$keywords=explode(',', $_POST['FaqCreateForm']['faq_keywords']);
					
					foreach ($keywords as $key => $keyword) {
						$keyword=ltrim($keyword," ");
						//check if the keyword already exists
						$isKey=Keywords::model()->findAll(array(
							'condition'=>'keyword=:keyword',
							'params'=>array(':keyword'=>$keyword)
									)
								);
						//if not exists
						if(empty($isKey))
						{
							//create ne keyword
							$newKeyword= new Keywords;
							//sets keyword attributes
							$newKeyword->keyword_id=functions::new_id(15);
							$newKeyword->keyword=$keyword;
							$newKeyword->lang=$this->getCurrentLang();
							
							//save keyword
							if ($newKeyword->save()) {
								//creates and save KeywordFaq
								$keywordFaq= new KeywordsFaq;
								$keywordFaq->keyword_id=$newKeyword->keyword_id;
								$keywordFaq->faq_id=$faq->faq_id;
								$keywordFaq->save();
							}
						}
						//if keyword exsists
						else
						{
							//creates and save KeywordFaq
							$keywordFaq= new KeywordsFaq;
							$keywordFaq->keyword_id=$isKey['0']->keyword_id;
							$keywordFaq->faq_id=$faq->faq_id;
							$keywordFaq->save();
						}
					}
				}
				//if categories selected
				if(!empty($model->faq_categories))
				{
					//save selected categories to FaqCategoryFaq (connects faq and category)
					foreach ($model->faq_categories as $key => $category) {
						$faq_category_faq=new FaqCategoryFaq;
						$faq_category_faq->faq_category_id=$category;
						$faq_category_faq->faq_id=$faq->faq_id;
						$faq_category_faq->save();
					}
				}
			}
			//redirects to new faq view
			$this->redirect(array('view','id'=>$faq->faq_id));

		}

		$this->render('create',array(
			'model'=>$model,
			'categories'=>$categories
		));
	}

	public function actionSearchKey($term)
	{
		$lang=$this->getCurrentLang();

		$keywords= Keywords::model()->findAll(array(
			'condition'=>'lang=:lang',
			'params'=>array(':lang'=>$lang)
			));

 		foreach ($keywords as $key => $keyword) {
 			if (strpos($keyword->keyword, $term) !==false) {
 				$data[]=array('label'=>$keyword->keyword,'value'=>$keyword->keyword);
 			}
 		}
 		echo json_encode($data);
	}

	public function getCurrentLang()
	{
		$lang=explode('_',Yii::app()->language);
		return ($lang[0]) ? $lang[0] : 'tr' ;
	}

	/**
	 * Updates a particular model.
	 * If update is successful, the browser will be redirected to the 'view' page.
	 * @param integer $id the ID of the model to be updated
	 */
	public function actionUpdate($id)
	{
		$model=$this->loadModel($id);

		// Uncomment the following line if AJAX validation is needed
		// $this->performAjaxValidation($model);

		if(isset($_POST['Faq']))
		{
			$model->attributes=$_POST['Faq'];
			if($model->save())
				$this->redirect(array('view','id'=>$model->faq_id));
		}

		$this->render('update',array(
			'model'=>$model,
		));
	}

	/**
	 * Deletes a particular model.
	 * If deletion is successful, the browser will be redirected to the 'admin' page.
	 * @param integer $id the ID of the model to be deleted
	 */
	public function actionDelete($id)
	{
		$this->loadModel($id)->delete();

		// if AJAX request (triggered by deletion via admin grid view), we should not redirect the browser
		if(!isset($_GET['ajax']))
			$this->redirect(isset($_POST['returnUrl']) ? $_POST['returnUrl'] : array('admin'));
	}

	/**
	 * Lists all models.
	 */
	public function actionIndex($category=null)
	{
		$lang=$this->getCurrentLang();
		// if (!$category) {
		// 	if ($lang=='tr') {
		// 		$category='Genel';
		// 	}else
		// 	{
		// 		$category='General';
		// 	}
		// }

		$categories=FaqCategory::model()->findAll('lang=:lang',array('lang'=>$lang));

		// $category=FaqCategory::model()->find('faq_category_title=:faq_category_title',array('faq_category_title'=>$category));
		// $categoryFaqs=FaqCategoryFaq::model()->findAll('faq_category_id=:faq_category_id',array('faq_category_id'=>$category->faq_category_id));
		// $faqs=array();
		// foreach ($categoryFaqs as $key => $categoryFaq) {
		// 	$faqs[]=Faq::model()->find('faq_id=:faq_id',array('faq_id'=>$categoryFaq->faq_id));
		// }


		$model=Faq::model()->findAll(array('order'=>'lang'));
		foreach ($model as $key => $faq) {
			$data[$key]['faq']=$faq;

			$categoriesFaq=FaqCategoryFaq::model()->findAll(array(
			'condition'=>'faq_id=:faq_id',
			'params'=>array(':faq_id'=>$faq->faq_id)
			));

			foreach ($categoriesFaq as $keyCategory => $categoryFaq) {
				$data[$key]['categories'][]=FaqCategory::model()->findByPk($categoryFaq->faq_category_id);
			}

			$categoriesKeywords=KeywordsFaq::model()->findAll(array(
			'condition'=>'faq_id=:faq_id',
			'params'=>array(':faq_id'=>$faq->faq_id)
			));

			foreach ($categoriesKeywords as $keyKeyword => $keyword) {
				$data[$key]['keywords'][]=Keywords::model()->findByPk($keyword->keyword_id);
			}
		}
		$this->render('index',array(
			'faqs'=>$data,
			'categories'=>$categories
		));
	}

	public function actionKeyword($keywords=null)
	{
		$keywords=explode('|', $keywords);
		$conditions = "";
		$params= array();
		foreach ($keywords as $keywords_key => $keyword) {
			if($keywords_key != 0)  $conditions .= " OR ";
			$conditions .= "ky.keyword=:cat_name_$keywords_key ";	
			$params[ ":cat_name_$keywords_key" ]= functions::ufalt($keyword);
		}


		$conditions .= "AND lang=:lang" ;
		$params[":lang"] = $this->getCurrentLang();
		
		$res= Yii::app()->db->createCommand()
    		->select('*')
    		->from('keywords ky')
    		->naturalJoin('keywords_faq fk')
    		->naturalJoin('faq f')
    		->where($conditions, $params)
    		->order('faq_frequency desc, rate desc')
    		->queryAll()
    		;
   		foreach ($res as $res_key => &$res_value) {
    		$res_value=(object)($res_value);
    	}
   		$this->render('keywords',array(
			'data'=>$res
			));
	}

	public function actionCategory($categories=null)
	{

		$categories=explode('|', $categories);
		$conditions = "";
		$params= array();	
		foreach ($categories as $categories_key => $category) {
			
			if($categories_key != 0)  $conditions .= " OR ";
			$conditions .= "LOWER(fc.faq_category_title)=:cat_name_$categories_key ";	
			$params[ ":cat_name_$categories_key" ]= functions::ufalt($category);
		} 

		$conditions .= "AND lang=:lang" ;
		$params[":lang"] = $this->getCurrentLang();
		
		$res= Yii::app()->db->createCommand()
    		->select('*')
    		->from('faq_category fc')
    		->naturalJoin('faq_category_faq fcf')
    		->naturalJoin('faq f')
    		->where($conditions, $params)
    		->order('faq_frequency desc, rate desc')
    		->queryAll()
    		;
    	
    	foreach ($res as $res_key => &$res_value) {
    		$res_value=(object)($res_value);
    		$res_value->keywords = 
    		Yii::app()->db->createCommand()
	    		->select('*')
	    		->from('keywords_faq kf')
	    		->naturalJoin('keywords k')
	    		->where("faq_id=:faq_id",  array(':faq_id' =>  $res_value->faq_id ))

	    		->queryAll()
    		;
    	}
    
		$this->render('categories',array(
			'data'=>$res
			));
		
	}

	/**
	 * Manages all models.
	 */
	public function actionAdmin()
	{
		$model=new Faq('search');
		$model->unsetAttributes();  // clear any default values
		if(isset($_GET['Faq']))
			$model->attributes=$_GET['Faq'];

		$this->render('admin',array(
			'model'=>$model,
		));
	}

	/**
	 * Returns the data model based on the primary key given in the GET variable.
	 * If the data model is not found, an HTTP exception will be raised.
	 * @param integer $id the ID of the model to be loaded
	 * @return Faq the loaded model
	 * @throws CHttpException
	 */
	public function loadModel($id)
	{
		$model=Faq::model()->findByPk($id);
		if($model===null)
			throw new CHttpException(404,'The requested page does not exist.');
		return $model;
	}

	/**
	 * Performs the AJAX validation.
	 * @param Faq $model the model to be validated
	 */
	protected function performAjaxValidation($model)
	{
		if(isset($_POST['ajax']) && $_POST['ajax']==='faq-form')
		{
			echo CActiveForm::validate($model);
			Yii::app()->end();
		}
	}

}
