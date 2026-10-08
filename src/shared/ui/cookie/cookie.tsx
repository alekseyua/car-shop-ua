import React from 'react'

const cookie = () => {
  return (
       <div className="modal fade" id="CookiesOptions" tabIndex="-1" role="dialog" aria-labelledby="CookiesOptions" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <p className="h2 modal-title modal_cookie_header" id="CookiesOptions">Настройки файлов cookie</p>
                </div>

                <div className="modal-body">

                    <div className="cookie_checkboxes">
                        <p>Мы используем четыре типа файлов cookie и аналогичных технологий, чтобы обеспечить персонализированный и улучшенный пользовательский опыт. Мы различаем следующие файлы cookie:</p>
                        <ul className="items">
                            <li>
                                <p className="h5 text-primary">Необходимые файлы</p>
                                <label for="functional">
                                    <input type="checkbox" value="functional" name="functional" className="cookie_checkbox" disabled="disabled" checked="checked" id="functional"/>
                                    <span className="cookie_checkbox"></span>
                                    <div className="description">Необходимые файлы «куки» помогают сделать сайт удобным, позволяя реализовать основные функции, такие как навигация по странице и доступ к защищенным областям сайта. Сайт не может нормально функционировать без этих файлов «куки».</div>
                                </label>
                            </li>
                            <li>
                                <p className="h5 text-primary">Настроечные файлы</p>
                                <label for="analytical">
                                    <input type="checkbox" value="analytical" name="analytical" className="cookie_checkbox" checked="checked" id="analytical"/>
                                    <span className="cookie_checkbox"></span>
                                    <div className="description">Настроечные файлы «куки» позволяют сайту запоминать информацию, которая изменяет способ работы или вид сайта, например, с учетом вашего предпочтительного языка и региона, в котором вы находитесь.</div>
                                </label>
                            </li>
                            
                                <li>
                                    <p className="h5 text-primary">Статистические</p>
                                    <label for="social">
                                        <input type="checkbox" value="social" name="social" className="cookie_checkbox" checked="checked" id="social"/>
                                        <span className="cookie_checkbox"></span>
                                        <div className="description">Статистические файлы cookie собирают и передают анонимные данные от пользователей нашего веб-сайта, позволяя нам лучше понимать, как используется наш сайт.</div>
                                    </label>
                                </li>
                            
                            
                                <li>
                                    <p className="h5 text-primary">Marketing cookies</p>
                                    <label for="marketing">
                                        <input type="checkbox" value="marketing" name="marketing" className="cookie_checkbox" checked="checked" id="marketing"/>
                                        <span className="cookie_checkbox"></span>
                                        <div className="description">Маркетинговые «куки» используются для отслеживания перемещения посетителей по сайтам. Цель этого отслеживания — показ рекламных объявлений, которые актуальны и интересны для конкретного пользователя и тем самым более ценны для издателей и сторонних рекламодателей.</div>
                                    </label>
                                </li>
                            
                        </ul>
                    </div>
                    
                    <div id="cookie_popup_content_modal">
                        <div className="rich-text"><p data-block-key="vfzjp"><b>Общее представление о файлах cookie</b></p><p data-block-key="3nfhn">«Куки» — это небольшие текстовые файлы, которые могут использоваться сайтами для повышения эффективности работы пользователей. В законе говорится, что мы можем хранить файлы «куки» на вашем устройстве, если они абсолютно необходимы для функционирования этого сайта. В отношении всех остальных типов файлов «куки» необходимо получить ваше разрешение. Этот сайт использует разные типы файлов «куки». Некоторые файлы «куки»размещаются сторонними сервисами, отображаемыми на наших страницах. Вы можете в любое время изменить или отозвать свое согласие с Декларацией о куки-файлах на нашем сайте. Узнайте подробнее из нашей Политики конфиденциальности о том, кто мы такие, как вы можете связаться с нами и как мы обрабатываем личные данные. Сообщайте идентификатор и дату своего согласия, когда связываетесь с нами относительно этого согласия.</p></div>
                    </div>
                    
                </div>

                <div className="modal-footer" data-cookie-key="cookielaw_accepted" id="cookie_model_saveButton">
                    <button type="button" data-bs-dismiss="modal" data-dismiss="modal" aria-label="Close" className="btn  btn-primary">
                        Сохранить и принять
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default cookie