import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const validationSchema = z
  .object({
    username: z.string().min(6, { message: 'Username must be at least 6 characters' }),
    email: z
      .string()
      .min(1, { message: 'Email is required' })
      .email({ message: 'Must be a valid email' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z.string().min(1, { message: 'Confirm password is required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Password dont't match!",
  })

type ValidationSchema = z.infer<typeof validationSchema>

const Rehofo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({ resolver: zodResolver(validationSchema) })

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => console.log(data)

  return (
    <div className='flex flex-col items-center justify-start min-h-screen'>
      <div className='flex flex-col gap-6 px-6 py-10 mt-4 border rounded '>
        <h1 className='text-2xl font-semibold text-center text-gray-700'>Registration Form</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col gap-3 w-80'
        >
          <div className='flex flex-col gap-1'>
            <label
              className='text-sm'
              htmlFor='username'
            >
              Username
            </label>
            <input
              id='username'
              placeholder='Username'
              className='px-2 py-1 border rounded focus:outline-blue-500'
              type='text'
              {...register('username')}
            />
            {errors.username && (
              <p className='mt-1 text-xs text-red-500'>{errors.username.message}</p>
            )}
          </div>
          <div className='flex flex-col gap-1'>
            <label
              className='text-sm'
              htmlFor='email'
            >
              Email
            </label>
            <input
              id='email'
              placeholder='Email'
              className='px-2 py-1 border rounded focus:outline-blue-500'
              type='email'
              {...register('email')}
            />
            {errors.email && <p className='mt-1 text-xs text-red-500'>{errors.email.message}</p>}
          </div>
          <div className='flex flex-col gap-1'>
            <label
              className='text-sm'
              htmlFor='password'
            >
              Password
            </label>
            <input
              id='password'
              placeholder='Password'
              className='px-2 py-1 border rounded focus:outline-blue-500'
              type='password'
              {...register('password')}
            />
            {errors.password && (
              <p className='mt-1 text-xs text-red-500'>{errors.password.message}</p>
            )}
          </div>
          <div className='flex flex-col gap-1'>
            <label
              className='text-sm'
              htmlFor='confirmPasword'
            >
              Confirm Pasword
            </label>
            <input
              id='confirmPasword'
              placeholder='Confirm Pasword'
              className='px-2 py-1 border rounded focus:outline-blue-500'
              type='password'
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <p className='mt-1 text-xs text-red-500'>{errors.confirmPassword.message}</p>
            )}
          </div>
          <input
            type='submit'
            value='Register'
            className='py-1 mt-4 text-white bg-blue-500 rounded cursor-pointer hover:bg-blue-600'
          />
        </form>
      </div>
    </div>
  )
}

export default Rehofo
