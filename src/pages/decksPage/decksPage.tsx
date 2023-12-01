import { useState } from 'react'

import s from './decks.module.scss'

import { DeleteIcon, EditIcon, PlayIcon } from '@/assets/iconsComponents'
import { ButtonVariant, TypographyVariant } from '@/common'
import {
  Button,
  Checkbox,
  Pagination,
  Slider,
  TabsTrigger,
  TabSwitcher,
  TextField,
  Typography,
  Modal,
  Column,
  Sort,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components'
import {
  useCreateDeckMutation,
  useGetDecksQuery,
  useDeleteDeckMutation,
  useUpdateDeckMutation,
  CreateParamsType,
} from '@/services'

export const DecksPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [minCardsCount, setMinCardsCount] = useState(0)
  const [maxCardsCount, setMaxCardsCount] = useState(10)
  const [name, setName] = useState('')
  const [isOpenAddModal, setIsOpenAddModal] = useState(false)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false)
  const [authorId, setAuthorId] = useState('')
  const [tabsValue, setTabsValue] = useState('all')

  const MY_ID = 'f2be95b9-4d07-4751-a775-bd612fc9553a'
  const changeStateAddModalHandler = () => setIsOpenAddModal(!isOpenAddModal)
  const changeStateDeleteModalHandler = () => setIsOpenDeleteModal(!isOpenDeleteModal)
  const changeStateUpdateModalHandler = () => setIsOpenUpdateModal(!isOpenUpdateModal)
  const createDeckHandler = () => {
    createPack(addDeckInfo)
    changeStateAddModalHandler()
  }
  const deleteDeckHandler = (name: string, id: string) => {
    setDeleteDeckInfo({ name, id })
    changeStateDeleteModalHandler()
  }
  const updateDeckHandler = (info: DeckInfoType) => {
    setUpdateDeckInfo({ id: info.id, name: info.name, private: info.private })
    changeStateUpdateModalHandler()
  }
  const clearSettingsHandler = () => {
    setName('')
    setTabsValue('all')
    setMinCardsCount(0)
    setMaxCardsCount(10)
  }

  const [deleteDeckInfo, setDeleteDeckInfo] = useState<Omit<DeckInfoType, 'private'>>({
    id: '',
    name: '',
  })
  const [updateDeckInfo, setUpdateDeckInfo] = useState<DeckInfoType>({
    id: '',
    name: '',
    private: false,
    cover: '',
  })

  const [addDeckInfo, setAddDeckInfo] = useState<CreateParamsType>({
    cover: '',
    name: '',
    isPrivate: false,
  })

  let { data } = useGetDecksQuery({
    minCardsCount,
    maxCardsCount,
    name,
    currentPage,
    itemsPerPage,
    authorId,
  })

  const [sort, setSort] = useState<Sort>(null)
  const columns: Array<Column> = [
    {
      key: 'name',
      title: 'Name',
    },
    {
      key: 'cardsCount',
      title: 'Cards',
      sortable: true,
    },
    {
      key: 'updated',
      title: 'Last Updated',
    },
    {
      key: 'createdBy',
      title: 'Created by',
    },
    {
      key: 'buttons',
      title: '',
    },
  ]
  const [createPack] = useCreateDeckMutation()
  const [deleteDeck] = useDeleteDeckMutation()
  const [updatePack] = useUpdateDeckMutation()
  const perPageOptions = [10, 20, 30, 50, 100]
  const getDate = (dateTime: string) => {
    const date: Date = new Date(dateTime)

    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  }

  return (
    <section className={'container section'}>
      <Modal
        className={s.modal}
        title={'Delete Pack'}
        close={true}
        overlay={true}
        isOpen={isOpenDeleteModal}
        onOpenChange={changeStateDeleteModalHandler}
      >
        <div className={s.modalWrapper}>
          <div className={s.modalContent}>
            <Typography>
              Do you really want to remove
              <Typography variant={TypographyVariant.subtitle2} as={'span'}>
                {' '}
                {deleteDeckInfo.name}?{' '}
              </Typography>
              All cards will be deleted.
            </Typography>
          </div>
          <div className={s.modalFooter}>
            <Button
              onClick={changeStateDeleteModalHandler}
              variant={ButtonVariant.secondary}
              type={'button'}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                deleteDeck(deleteDeckInfo.id)
                changeStateDeleteModalHandler()
              }}
              type={'button'}
            >
              Delete Pack
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        className={s.modal}
        title={'Add New Pack'}
        close={true}
        overlay={true}
        isOpen={isOpenAddModal}
        onOpenChange={changeStateAddModalHandler}
      >
        <div className={s.modalWrapper}>
          <div className={s.modalContent}>
            <TextField
              className={s.modalInput}
              label={'Name Pack'}
              type={'text'}
              placeholder={'Name'}
              value={addDeckInfo.name}
              onValueChange={name => setAddDeckInfo({ ...addDeckInfo, name })}
            />
            <Checkbox
              label={'Private pack'}
              name={'isPrivateDeck'}
              checked={addDeckInfo.isPrivate}
              onCheckedChange={isPrivate =>
                setAddDeckInfo({ ...addDeckInfo, isPrivate: !!isPrivate })
              }
            />
          </div>
          <div className={s.modalFooter}>
            <Button
              onClick={changeStateAddModalHandler}
              variant={ButtonVariant.secondary}
              type={'button'}
            >
              Cancel
            </Button>
            <Button onClick={createDeckHandler} type={'button'}>
              Add New Pack
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        className={s.modal}
        title={'Edit Pack'}
        close={true}
        overlay={true}
        isOpen={isOpenUpdateModal}
        onOpenChange={changeStateUpdateModalHandler}
      >
        <div className={s.modalWrapper}>
          <div className={s.modalContent}>
            <TextField
              className={s.modalInput}
              label={'Name Pack'}
              type={'text'}
              placeholder={'Name'}
              value={updateDeckInfo.name}
              onValueChange={value => setUpdateDeckInfo({ ...updateDeckInfo, name: value })}
            />
            <Checkbox
              label={'Private pack'}
              name={'isPrivateDeck'}
              checked={updateDeckInfo.private}
              onCheckedChange={value => setUpdateDeckInfo({ ...updateDeckInfo, private: !!value })}
            />
          </div>
          <div className={s.modalFooter}>
            <Button
              onClick={changeStateUpdateModalHandler}
              variant={ButtonVariant.secondary}
              type={'button'}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                updatePack({
                  name: updateDeckInfo.name,
                  id: updateDeckInfo.id,
                  isPrivate: updateDeckInfo.private,
                  cover: updateDeckInfo.cover,
                })
                changeStateUpdateModalHandler()
              }}
              type={'button'}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>

      <div className={s.header}>
        <Typography variant={TypographyVariant.large} as={'h1'}>
          Packs list
        </Typography>
        <Button onClick={changeStateAddModalHandler} type={'button'}>
          Add New Pack
        </Button>
      </div>

      <div className={s.settings}>
        <TextField
          type={'search'}
          placeholder={'Input search'}
          value={name}
          onValueChange={value => setName(value)}
        />
        <div className={s.setting}>
          <Typography as={'span'}>Show packs cards</Typography>
          <TabSwitcher value={tabsValue} onValueChange={value => setTabsValue(value)}>
            <TabsTrigger
              variant={tabsValue === 'all' ? ButtonVariant.primary : ButtonVariant.tertiary}
              onClick={() => setAuthorId('')}
              value={'all'}
            >
              All Cards
            </TabsTrigger>
            <TabsTrigger
              variant={tabsValue === 'my' ? ButtonVariant.primary : ButtonVariant.tertiary}
              onClick={() => setAuthorId(MY_ID)}
              value={'my'}
            >
              My Cards
            </TabsTrigger>
          </TabSwitcher>
        </div>
        <div className={s.setting}>
          <Typography as={'span'}>Number of cards</Typography>
          <Slider
            value={[minCardsCount, maxCardsCount]}
            onValueChange={values => {
              setMinCardsCount(values[0])
              setMaxCardsCount(values[1])
            }}
          />
        </div>
        <Button
          className={s.clear}
          onClick={clearSettingsHandler}
          type={'button'}
          variant={ButtonVariant.secondary}
        >
          <DeleteIcon />
          Clear Filter
        </Button>
      </div>

      <Table className={s.table}>
        <TableHeader sort={sort} onSort={setSort} columns={columns} />

        <TableBody>
          {data?.items.map(item => (
            <TableRow key={item.id}>
              <TableCell>
                {item.cover ? (
                  <figure className={s.preview}>
                    <img className={s.image} src={item.cover} alt={'Preview'} />
                    <figcaption>{item.name}</figcaption>
                  </figure>
                ) : (
                  <span>{item.name}</span>
                )}
              </TableCell>
              <TableCell>{item.cardsCount}</TableCell>
              <TableCell>{getDate(item.updated)}</TableCell>
              <TableCell>{item.author.name}</TableCell>
              <TableCell>
                <a href="#" aria-label={'Learn deck'}>
                  <PlayIcon />
                </a>
                {item.author.id === MY_ID ? (
                  <>
                    <button
                      onClick={() =>
                        updateDeckHandler({ id: item.id, name: item.name, private: item.isPrivate })
                      }
                      type="button"
                      aria-label={'Edit deck'}
                    >
                      <EditIcon />
                    </button>
                    <button
                      onClick={() => deleteDeckHandler(item.name, item.id)}
                      type="button"
                      aria-label={'Delete deck'}
                    >
                      <DeleteIcon />
                    </button>
                  </>
                ) : null}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {data?.pagination?.totalPages && data?.pagination?.totalPages > 1 ? (
        <Pagination
          className={s.pagination}
          totalPages={data?.pagination.totalPages || 1}
          currentPage={currentPage}
          onChangePage={page => setCurrentPage(page)}
          onChangePerPage={perPage => {
            setItemsPerPage(perPage)
          }}
          perPageOptions={perPageOptions}
          perPage={itemsPerPage}
        />
      ) : null}
    </section>
  )
}

type DeckInfoType = {
  name: string
  id: string
  private: boolean
  cover?: ''
}
