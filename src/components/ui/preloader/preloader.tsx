import s from './preloader.module.scss'
export const Preloader = () => {
  return (
    <div className={s.preloader} aria-hidden>
      <div className={s.loader}></div>
    </div>
  )
}
